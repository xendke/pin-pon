class Ball {
	constructor() {
		this.x = 130;
		this.y = 80;
		this.vx = 5;
		this.vy = 5;
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	move() {
		this.x += this.vx;
		this.y += this.vy;
	}
	moveTo(x, y) {
		this.x = x;
		this.y = y;
	}
	reset() {
		this.x = 130;
		this.y = 80;
	}
	bounce(direction) {
		if(direction === 'VERTICAL') {
			this.vy = this.vy * -1;
		} else if (direction === 'HORIZONTAL') {
			this.vx = this.vx * -1;
		}
	}
}

module.exports = Ball;