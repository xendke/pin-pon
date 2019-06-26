const Ball = require('./ball');
const Paddle = require('./paddle');

class Game {
	constructor() {
		this.ball = new Ball();
		this.p1 = new Paddle('left');
		this.p2 = new Paddle('right');

		this.players = [];
	}
	checkForWin() {
    if(this.ball.x >= 300) {
			this.ball.reset();
			this.p1.incrementScore();
		} else if(this.ball.x <= 0) {
			this.ball.reset();
			this.p2.incrementScore();
		}
	}
	handleCollisions() {
		if(this.ball.y >= 300 || this.ball.y <= 0) {
			this.ball.bounce('VERTICAL');
		}
		if(
			(this.ball.x < this.p1.getX()+25 && this.ball.y > this.p1.getY() && this.ball.y < this.p1.getY()+75) ||
			(this.ball.x > this.p2.getX()-10 && this.ball.y > this.p2.getY() && this.ball.y < this.p2.getY()+75)
		) {
			this.ball.bounce('HORIZONTAL');
		}
	}
	tick() {
		if(this.players.length >= 2) {
			this.ball.move();
			this.checkForWin();
			this.handleCollisions();
		}
	}
	movePaddle(whichPaddle, directionToMove) {
		if(whichPaddle === 'left') {
			this.p1.move(directionToMove);
		} else if(whichPaddle === 'right') {
			this.p2.move(directionToMove);
		}
	}
	getAvailableSide() {
		if(this.players.length >= 2) {
			throw 'no available sides';
		}
		if(this.players.length === 0) return 'left';
		else return this.players[0].side === 'left' ? 'right' : 'left';
	}
	playerSideOf(clientId) {
		for( var i = 0; i < this.players.length; i++){
			if(this.players[i].clientId === clientId) return this.players[i].side;
		}
	}
	addPlayer(clientId) {
        this.players.push({
          clientId,
          side: this.getAvailableSide()
        });
	}
	removePlayer(clientId) {
		for( var i = 0; i < this.players.length; i++){
			if (this.players[i].clientId === clientId) {
				this.players.splice(i, 1); 
			}
		}
	}
	getGameData() {
		return {
			p1: {
				x: this.p1.getX(),
				y: this.p1.getY(),
				score: this.p1.getScore()
			},
			p2: {
				x: this.p2.getX(),
				y: this.p2.getY(),
				score: this.p2.getScore()
			},
			ball: {
				x: this.ball.getX(),
				y: this.ball.getY(),
			}
		};
	}
	reset() {
		this.ball.reset();
		this.p1.reset('left');
		this.p2.reset('right');
	}
}

module.exports = Game;