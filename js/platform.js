class Platform {

    constructor(ctx, canvasSize, size, position) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.size = size
        this.position = position
        // this.size = { w: 60, h: 10 }
        // this.position = {
        //     x: Math.random() * (this.canvasSize.w - this.size.w),
        //     y: (-this.size.h)
        // }
        this.speed = 2
    }

    draw() {
        this.move()

        this.ctx.fillStyle = 'pink'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }

    move() {
        console.log(this.position)
        this.position.y += this.speed
    }
}
