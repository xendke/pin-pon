import { canvas } from './utils.js';

class Ball {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 130;
        this.y = 80;
        this.vx = 2;
        this.vy = 2;
    }
    calculateVelocity() {
        if(this.x >= canvas.width || this.x <= 0) {
            this.vx = this.vx * -1;
        }
        if(this.y >= canvas.height || this.y <= 0) {
            this.vy = this.vy * -1;
        }
    }
    draw() {
        let { ctx, x, y } = this;
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    move() {
        this.calculateVelocity();
        this.x += this.vx;
        this.y += this.vy;
    }
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default Ball;