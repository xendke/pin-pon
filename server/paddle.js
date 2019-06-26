class Paddle {
	constructor(side) {
		this.width = 10;
		this.height = 75;
		this.reset(side);
	}
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getScore() {
		return this.score;
	}
	moveTo(x, y) {
		this.x = x;
		this.y = y;
	}
	move(direction) {
		if(direction === 'UP' && this.y >= 10){
			this.y = this.y - 10;
		} else if(direction === 'DOWN' && this.y < 300 - this.height){
			this.y = this.y + 10;
		}   
	}
	reset(side) {
		this.score = 0;
		this.x = 0;
		this.y = 0;
		if(side === 'right') {
			this.x = 300 - this.width;
		}
	}
	incrementScore() {
		this.score = this.score + 1;
	}
}

module.exports = Paddle;