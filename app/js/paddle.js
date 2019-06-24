import { canvas } from './utils.js';

class Paddle {
    constructor(ctx, player) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 75;
        this.player = player;
        if(this.player === 'ENEMY') {
            this.x = canvas.width - this.width;
        }
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    draw() {
        let { ctx, x, y, width, height } = this;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();

    }
    moveTo(x, y) {
        if(this.player === 'ENEMY') {
            this.x = x;
            this.y = y;
        }
    }
    move(direction) {
        if(this.player === 'SELF') {
            if(direction === 'UP' && this.y >= 10){
                this.y = this.y - 10;
            } else if(direction === 'DOWN' && this.y < canvas.height - this.height){
                this.y = this.y + 10;
            }   
        }
    }
}

export default Paddle;