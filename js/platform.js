class Platform {

    constructor(ctx, size, position, type) {

        this.ctx = ctx
        this.size = size
        this.position = position
        this.type = type

        this.speed = 2
    }

    draw() {
        this.move()

        switch (this.type) {
            case 'standard':
                this.ctx.fillStyle = 'red'
                this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
                break
            case 'doubleJump':
                this.ctx.fillStyle = 'blue'
                this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
                break
            case 'broken':
                this.ctx.fillStyle = 'black'
                this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
                break
            default:
                this.ctx.fillStyle = 'pink'
                this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
                break
        }
    }

    move() {
        this.position.y += this.speed
    }
}
