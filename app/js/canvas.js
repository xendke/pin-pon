import Ball from './ball.js';
import Paddle from './paddle.js';
import { canvasElement, getCanvasContext } from './utils.js';

class Canvas {
	constructor() {
		this.ctx = getCanvasContext();
		this.p1 = new Paddle(this.ctx);
		this.p2 = new Paddle(this.ctx);
		this.ball = new Ball(this.ctx);

		this.draw = this.draw.bind(this);
	}
	update(data) {
		this.p1.moveTo(data.p1.x, data.p1.y);
		this.p2.moveTo(data.p2.x, data.p2.y);
		this.ball.moveTo(data.ball.x, data.ball.y);
	}
	draw() {
		this.ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
		this.p1.draw();
		this.p2.draw();
		this.ball.draw();
	}
}

export default Canvas;