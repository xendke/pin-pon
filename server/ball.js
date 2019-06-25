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
	move(p1x, p1y, p2x, p2y) {
		if(this.x >= 300) {
			this.x = 130;
			this.y = 80;
			return 0;
		}
		if(this.x <= 0) {
			this.x = 130;
			this.y = 80;
			return 1;
		}
		if(this.y >= 300 || this.y <= 0) {
			this.vy = this.vy * -1;
		}
		if(this.x < p1x+25 && this.y > p1y && this.y < p1y+75) {
			this.vx = this.vx * -1;
		}
		if(this.x > p2x-10 && this.y > p2y && this.y < p2y+75) {
			this.vx = this.vx * -1;
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