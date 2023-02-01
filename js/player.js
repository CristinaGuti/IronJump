class Player {

    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.moveLeft = false
        this.moveRight = false
        this.size = { w: 60, h: 75 }
        this.position = {
            x: this.canvasSize.w / 2 - this.size.w / 2,
            y: this.canvasSize.h / 2
        }
        this.speed = { x: 0, y: 5 }
        this.gravity = 0.4
        this.jumpPosY = 10
        this.jumpSpeed = 10

        this.init()
    }

    init() {
        this.imagePlayerUp = new Image()
        this.imagePlayerUp.src = './img/PlayerUp.png'
        this.imagePlayerDown = new Image()
        this.imagePlayerDown.src = './img/PlayerDown.png'
    }

    draw() {
        this.move()
        this.jump()

        if (this.speed.y > 0) {
            this.ctx.drawImage(this.imagePlayerDown, this.position.x, this.position.y, this.size.w, this.size.h)
        } else {
            this.ctx.drawImage(this.imagePlayerUp, this.position.x, this.position.y, this.size.w, this.size.h)
        }
    }

    move() {
        if (this.moveLeft) this.position.x -= 5

        if (this.moveRight) this.position.x += 5

        if ((this.position.x - this.size.w / 4) > this.canvasSize.w) {
            this.position.x = - this.size.w * 0.75
        } else if ((this.position.x + this.size.w * 0.75) < 0) {
            this.position.x = this.canvasSize.w - this.size.w / 4
        }

        if (this.position.y + this.size.h < 0) {
            this.position.y = this.canvasSize.h
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
                    break
                case 'doubleJump':
                    this.speed.y = -(this.jumpSpeed * 1.2)
                    break
                case 'broken':
                    this.speed.y = - (this.jumpSpeed / 2)
                    break
                default:
                    this.speed.y = -this.jumpSpeed
                    break
            }
        }
    }
}



