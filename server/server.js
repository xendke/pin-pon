'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const Ball = require('./ball');
const Paddle = require('./paddle');
const Game = require('./game');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..','app');

const server = express()
	.use(express.static(ROOT))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const ball = new Ball();
const playerOne = new Paddle('left');
const playerTwo = new Paddle('right');
const game = new Game(ball, playerOne, playerTwo);

let players = [];

function gameLoop() {
	if(players.length >= 2) {
		ball.move();
		game.checkForWin();
		game.handleCollisions();
	}
}

wss.on('connection', (ws) => {
	console.log('Client connected');

	wss.clients.forEach((client) => {
		let data = {
			type: 'config',
			...game.getGameData()
		}
		client.send(JSON.stringify(data));
	});

	ws.on('message', function incoming(data) {
		data = JSON.parse(data);
		if(data.type === 'player_ready'){
			players.push('_');
			if(players.length > 2) {
				ws.send(JSON.stringify({
					type: 'error',
					error: 'too many players'
				}));
			}
			ws.send(JSON.stringify({
				type: 'set_side',
				side: (players.length === 1 ? 'left' : 'right')
			}));
		} else if(data.type === 'move') {
			if(data.side === 'left') {
				playerOne.move(data.direction);
			} else if(data.side === 'right') {
				playerTwo.move(data.direction);
			}
		}
	});

	setInterval(() => {
		gameLoop();
		
		wss.clients.forEach((client) => {
			let data = {
				type: 'update',
				...game.getGameData()
			}
			client.send(JSON.stringify(data));
		});
	}, 100);

	wss.on('close', () => {
		console.log('Client disconnected');
		players.pop();
	});
});
