import Canvas from './canvas.js';
import Player from './player.js';
import { updateScore, showJoinViewButton, createButton, joinButton, roomIdInput, updateView } from './utils.js';

var HOST = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(HOST);

const createGame = () => {
	startGame();
	
	const data = {
		type: 'create_game'
	}
	ws.send(JSON.stringify(data));
	
	updateView('game');
}

const joinGame = (roomId) => {
	console.log(roomId);
	startGame();

	const data = {
		type: 'join',
		roomId: roomId
	}
	ws.send(JSON.stringify(data));

	updateView('game');
}



const startGame = () => {
	const canvas = new Canvas();
	const player = new Player(ws);
	
	ws.onmessage = function (event) {
		if(typeof event.data !== 'string') throw 'event data is not a string';
		let data = JSON.parse(event.data);
	
		switch(data.type) {
			case 'config':
				console.log('config', data);
				break;
			case 'set_side':
				player.setSide(data.side);
				break;
			case 'error':
				throw data.error;
			case 'update':
				canvas.update(data);
				updateScore(data);
				break;
			default:
				break;
		}
	};

	setInterval(canvas.draw, 10);
}

showJoinViewButton.onclick = () => {
	updateView('join');
};
createButton.onclick = createGame;
joinButton.onclick = (e) => {
	e.preventDefault();
	joinGame(roomIdInput.value)
}