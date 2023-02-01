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
        this.jumpPosY = 10
        this.jumpSpeed = 10
    }

    draw() {
        this.move()
        this.jump()

        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
    }

    move() {
        if (this.moveLeft) this.position.x -= 2

        if (this.moveRight) this.position.x += 2

        if (this.position.x > this.canvasSize.w) {
            this.position.x = - this.size.w
        } else if (this.position.x + this.size.w < 0) {
            this.position.x = this.canvasSize.w
        }
    }

    jump() {
        this.position.y += this.speed.y
        this.speed.y += this.gravity

    }

    jumpCollision(platformType) {
        if (this.speed.y > 0) {
            this.position.y -= this.jumpPosY
            switch (platformType) {
                case 'standard':
                    this.speed.y = -this.jumpSpeed
                    console.log('STANDARD')
                    break
                case 'doubleJump':
                    this.speed.y = -(this.jumpSpeed * 1.5)
                    console.log('DOUBLE JUMP')
                    break
                case 'broken':
                    //this.speed.y = - (this.jumpSpeed / 10)
                    console.log('BROKEN')
                    break
                default:
                    this.speed.y = -this.jumpSpeed
                    console.log('DEFAULT')
                    break
            }
        }
    }
}



