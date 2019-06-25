class Paddle {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = 10;
        this.height = 75;
        
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
        this.x = x;
        this.y = y;
    }
}

export default Paddle;