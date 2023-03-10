class Platform {

    constructor(ctx, size, position, speed, type) {

        this.ctx = ctx
        this.size = size
        this.position = position
        this.speed = speed
        this.type = type

        this.init()
    }

    init() {
        this.imagePlatOrange = new Image()
        this.imagePlatOrange.src = './img/PlatformOrange.png'
        this.imagePlatYellow = new Image()
        this.imagePlatYellow.src = './img/PlatformYellow.png'
        this.imagePlatBlue = new Image()
        this.imagePlatBlue.src = './img/PlatformBlue.png'
        this.imagePlatPurple = new Image()
        this.imagePlatPurple.src = './img/PlatformPurple.png'
    }

    draw() {
        this.move()

        switch (this.type) {
            case 'standard':
                this.ctx.drawImage(this.imagePlatOrange, this.position.x, this.position.y, this.size.w, this.size.h)
                break
            case 'doubleJump':
                this.ctx.drawImage(this.imagePlatBlue, this.position.x, this.position.y, this.size.w, this.size.h)
                break
            case 'smallJump':
                this.ctx.drawImage(this.imagePlatPurple, this.position.x, this.position.y, this.size.w, this.size.h)
                break
            default:
                this.ctx.drawImage(this.imagePlatOrange, this.position.x, this.position.y, this.size.w, this.size.h)
                break
        }
    }

    move() {
        this.position.y += this.speed
    }
}
