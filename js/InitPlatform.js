class InitPlatform {
    // meter ARGUMENTOS POR EL CONSTRUCTOR 
    constructor(ctx, canvasSize, posX, posY, width, height) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.size = { w: 350, h: 10 }
        // this.size2 = { w: 150, h: 10 }

        this.position = { x: 0, y: 550 }
        // this.position2 = { x: 0, y: 450 }
        // this.position3 = { x: 175, y: 350 }
        // this.position4 = { x: 0, y: 250 }
        // this.position5 = { x: 175, y: 150 }

        this.speed = 0.1
    }

    draw() {
        //if(player.position.y > canvasSize.h +450){this.move()}
        //this.move()

        this.ctx.fillStyle = 'pink'
        this.ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h)
        // this.ctx.fillStyle = 'pink'
        // this.ctx.fillRect(this.position2.x, this.position2.y, this.size1.w, this.size1.h)
        // this.ctx.fillStyle = 'pink'
        // this.ctx.fillRect(this.position3.x, this.position3.y, this.size2.w, this.size2.h)
        // this.ctx.fillStyle = 'pink'
        // this.ctx.fillRect(this.position4.x, this.position4.y, this.size2.w, this.size2.h)
        // this.ctx.fillStyle = 'pink'
        // this.ctx.fillRect(this.position5.x, this.position5.y, this.size2.w, this.size2.h)
    }

    move() {
        this.position.y += this.speed
    }
}
