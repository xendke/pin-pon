'use strict';

const express = require('express');
const path = require('path');
const SocketServer = require('ws').Server;
const Game = require('./game');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..','app');

const server = express()
	.use(express.static(ROOT))
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const game = new Game();

wss.on('connection', (ws, req) => {
  console.log('Client connected');
  const clientId = req.headers['sec-websocket-key'];

  let data = {
    type: 'config',
    // side: (players.length === 1 ? 'left' : 'right'),
    id: clientId,
    canvas: {
      width: 300,
      height: 300
    }
  }
  ws.send(JSON.stringify(data));

	ws.on('message', function incoming(data) {
    data = JSON.parse(data);
    switch(data.type) {
      case 'player_ready':
        const side = game.getAvailableSide();
        game.players.push({
          clientId,
          side,
        });
        if(game.players.length <= 2) {
          ws.send(JSON.stringify({
            type: 'set_side',
            side
          }));
        } else {
          ws.send(JSON.stringify({
            type: 'error',
            error: 'too many players'
          }));
        }
        break;
      case 'move':
        game.movePaddle(data.side, data.direction);
        break;
      default:
        break;
    }
	});

	setInterval(() => {
		game.tick();
		
		wss.clients.forEach((client) => {
			let data = {
				type: 'update',
				...game.getGameData()
			}
			client.send(JSON.stringify(data));
		});
	}, 100);

	ws.on('close', () => {
		console.log('Client disconnected');
    for( var i = 0; i < game.players.length; i++){
      if (game.players[i] === clientId) {
        game.players.splice(i, 1); 
      }
    }
    if(game.players.length === 0) {
      game.reset();
    }
	});
});
