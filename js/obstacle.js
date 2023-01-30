class Obstacle {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.size = { w: 50, h: 10 }
        this.position = {
            x: Math.random() * (this.canvasSize.w - this.size.w),
            y: Math.random() * (this.canvasSize.h - this.size.h)
        }
        this.speed = 1
    }



    draw() {
        this.move()

        this.ctx.fillStyle = 'pink'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }

    move() {
        this.position.y += this.speed
    }
}
