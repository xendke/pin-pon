class Ball {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 130;
        this.y = 80;
        this.vx = 2;
        this.vy = 2;
    }
    draw() {
        let { ctx, x, y } = this;
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }
}

export default Ball;