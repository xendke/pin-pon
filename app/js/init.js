import Ball from './ball.js';
import Paddle from './paddle.js';
import { canvas } from './utils.js';

// var HOST = 'ws://pin-pon.herokuapp.com';
var HOST = location.origin.replace(/^http/, 'ws');

var ws = new WebSocket(HOST);
var ctx = canvas.getContext("2d");
var scoresElement = document.getElementById('scores');


var p1 = new Paddle(ctx);
var p2 = new Paddle(ctx);
var ball = new Ball(ctx);
var side;

function draw() { // main drawing loop
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ball.draw();
	p1.draw();
	p2.draw();
}

ws.onmessage = function (event) { // web sockets handler
	if(typeof event.data !== 'string') throw 'event data is not a string';
	let data = JSON.parse(event.data);

	switch(data.type) {
		case 'set_side':
			side = data.side;
			console.log(side);
			break;
		case 'error':
			throw data.error;
		case 'update':
			p1.moveTo(data.p1.x, data.p1.y);
			p2.moveTo(data.p2.x, data.p2.y);
			ball.moveTo(data.ball.x, data.ball.y);
			scoresElement.innerHTML = `Player One: ${data.p1.score} || Player Two: ${data.p2.score}`;
			break;
		default:
			break;
	}
};

ws.onopen = function open() { // on connect
	const data = {
		type: 'player_ready'
	}
	ws.send(JSON.stringify(data));

	setInterval(draw, 10);
};

// keyboard handler
document.onkeydown = function checkKey(e) {
	const data = {
		type: 'move',
		direction: '',
		side: side,
	}

	if (e.keyCode == '38') {
		data.direction = 'UP';
	} else if (e.keyCode == '40') {
		data.direction = 'DOWN';
	}
	if(data.direction !== ''){
		ws.send(JSON.stringify(data));
	}
}