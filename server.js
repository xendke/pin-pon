'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'app');

const server = express()
  .use(express.static(ROOT))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

let ballVelocityX = 2;
let ballVelocityY = 2;

let gameData = {
  canvasWidth: 100,
  canvasHeight: 100,
  p1: {
    x: 10,
    y: 11
  },
  p2: {
    x: 10,
    y: 11
  },
  ball: {
    x: 0,
    y: 0
  }
}

let players = [];

function gameLoop() {
  if(gameData.ball.x >= gameData.canvasWidth || gameData.ball.x <= 0) {
      ballVelocityX = ballVelocityX * -1;
  }
  if(gameData.ball.y >= gameData.canvasHeight || gameData.ball.y <= 0) {
      ballVelocityY = ballVelocityY * -1;
  }
  gameData.ball.x += ballVelocityX;
  gameData.ball.y += ballVelocityY;
}


wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(data) {
    data = JSON.parse(data);
    gameData = { type: undefined, ...data };
    players.push('_');
  });

  setInterval(() => {

    gameLoop();
    
    wss.clients.forEach((client) => {
      let data = {
        type: 'update',
        ...gameData
      }
      client.send(JSON.stringify(data));
    });
  }, 100);

  ws.on('close', () => {
    players.pop();
  });
});
