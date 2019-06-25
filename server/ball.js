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
		if(this.x >= 300 || this.x <= 0) {
			this.vx = this.vx * -1;
		}
		if(this.y >= 300 || this.y <= 0) {
			this.vy = this.vy * -1;
		}
		this.x += this.vx;
		this.y += this.vy;
	}
		moveTo(x, y) {
			this.x = x;
			this.y = y;
	}
	
}

module.exports = Ball