'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const Ball = require('./ball');
const Paddle = require('./paddle');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..','app');

const server = express()
  .use(express.static(ROOT))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const ball = new Ball();
const playerOne = new Paddle('left');
const playerTwo = new Paddle('right');

let players = [];

let scores = [0, 0];

function gameLoop() {
  if(players.length >= 2) {
    let win = ball.move(playerOne.getX(), playerOne.getY(), playerTwo.getX(), playerTwo.getY());
    scores[win] +=1;
  }
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach((client) => {
    let data = {
      type: 'config',
      p1: {
        x: playerOne.getX(),
        y: playerOne.getY(),
        score: scores[0]
      },
      p2: {
        x: playerTwo.getX(),
        y: playerTwo.getY(),
        score: scores[1]
      },
      ball: {
        x: ball.getX(),
        y: ball.getY()
      }
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
        p1: {
          x: playerOne.getX(),
          y: playerOne.getY(),
          score: scores[0]
        },
        p2: {
          x: playerTwo.getX(),
          y: playerTwo.getY(),
          score: scores[1]
        },
        ball: {
          x: ball.getX(),
          y: ball.getY()
        }
      }
      client.send(JSON.stringify(data));
    });
  }, 100);

  ws.on('close', () => {
    players.pop();
  });
});
