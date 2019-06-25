class Paddle {
	constructor(side) {
			this.x = 0;
			this.y = 0;
			this.width = 10;
			this.height = 75;
			if(side === 'right') {
				this.x = 300 - this.width;
			}
	}
	getX() {
			return this.x;
	}
	getY() {
			return this.y;
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
}
module.exports = Paddle;