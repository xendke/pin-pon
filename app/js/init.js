import Canvas from './canvas.js';
import Player from './player.js';
import { updateScore } from './utils.js';

var HOST = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(HOST);

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

ws.onopen = function open() {
	const data = {
		type: 'player_ready'
	}
	ws.send(JSON.stringify(data));

	setInterval(canvas.draw, 10);
};