class Player {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.moveLeft = false
        this.moveRight = false
        this.size = { w: 50, h: 50 }
        this.position = {
            x: this.canvasSize.w / 2 - this.size.w / 2,
            y: this.canvasSize.h / 2
        }
        this.speed = { x: 0, y: 5 }
        this.gravity = 0.4
        this.collision = false
        this.jumpPosY = 20
        this.jumpSpeed = 10
    }

    draw() {
        this.move()
        this.jump()

        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }

    move() {
        if (this.moveLeft && this.position.x > 0) {
            this.position.x -= 2

        }
        if (this.moveRight && (this.position.x + this.size.w) < this.canvasSize.w) {
            this.position.x += 2
        }
    }

    jump() {

        this.position.y += this.speed.y
        this.speed.y += this.gravity

        if (this.position.y > this.canvasSize.h - this.size.h) {
            this.speed.y = - this.jumpSpeed
            console.log('YOU DIE')
        }
        if (this.collision && this.speed.y > 0) {
            this.collision = false
            this.speed.y = -this.jumpSpeed
            this.position.y -= this.jumpPosY

        }
    }
}



