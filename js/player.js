class Player {

    constructor(ctx, canvasSize, playerSize, playerPos, playerLeft, playerRight) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = playerSize
        this.playerLeft = playerLeft
        this.playerRight = playerRight
        this.playerPos = playerPos

        this.bottomPos = this.playerPos.y
        this.playerVel = {
            x: 0,
            y: 5
        }
        this.gravity = 0.1

        this.init()
    }

    init() { }


    draw() {
        this.jump()
        this.move()

        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }

    move() {
        if (this.playerLeft && this.playerPos.x > 0) {
            this.playerPos.x -= 5

        }
        if (this.playerRight && (this.playerPos.x + this.playerSize.w) < this.canvasSize.w) {
            this.playerPos.x += 5
        }
    }

    jump() {
        this.playerPos.y += this.playerVel.y
        this.playerVel.y += this.gravity

        if (this.playerPos.y > this.canvasSize.h - this.playerSize.h) {
            this.playerVel.y *= -1
        }
    }
}



