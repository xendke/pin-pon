import Ball from './ball.js';
import Paddle from './paddle.js';
import { canvas } from './utils.js';

// var HOST = 'ws://pin-pon.herokuapp.com';
var HOST = location.origin.replace(/^http/, 'ws')

var ws = new WebSocket(HOST);
var ctx = canvas.getContext("2d");

var p1 = new Paddle(ctx, 'SELF');
var p2 = new Paddle(ctx, 'ENEMY');
var ball = new Ball(ctx);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    p1.draw();
    p2.draw();
}

ws.onmessage = function (event) {
    if(typeof event.data === 'string') {
        let data = JSON.parse(event.data);
        p2.moveTo(data.p2.x, data.p2.y);
        ball.moveTo(data.ball.x, data.ball.y);
    }
};

ws.onopen = function open() {
    const data = {
        type: 'config',
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        p1: {
            x: p1.getX(),
            y: p1.getY()
        },
        p2: {
            x: p2.getX(),
            y: p2.getY()
        },
        ball: {
            x: 130,
            y: 80
        }
    }
    ws.send(JSON.stringify(data));

    setInterval(draw, 100);
};

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        p1.move('UP');
    } else if (e.keyCode == '40') {
        p1.move('DOWN');
    }
    const data = {
        type: 'update',
        p1: {
            x: p1.getX(),
            y: p1.getY()
        },
        p2: {
            x: p2.getX(),
            y: p2.getY()
        }
    }
    ws.send(JSON.stringify(data));
}