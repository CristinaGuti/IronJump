class Background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.image = new Image()
        this.image.src = "./img/bg.png"
        console.log(this.image)
        this.position = { x: 0, y: 0 }
        this.speedY = 2
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.canvasSize.w, this.canvasSize.h)
        this.ctx.drawImage(this.image, this.position.x, this.position.y - this.canvasSize.h, this.canvasSize.w, this.canvasSize.h)
        this.move()
    }

    move() {
        if (this.position.y >= this.canvasSize.h) {
            this.position.y = 0;
        }
        this.position.y += this.speedY;
    }
}