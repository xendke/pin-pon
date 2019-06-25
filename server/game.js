class Game {
	constructor(ball, p1, p2) {
		this.ball = ball;
		this.p1 = p1;
		this.p2 = p2;
		this.scores = [0, 0];
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
}

module.exports = Game;