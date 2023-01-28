const IronJump = {
    name: 'IronJump',
    description: 'Game to jump on multiple platforms',
    version: '1.0.1',
    license: undefined,
    author: 'Cristina Gutierrez y Daniel de Miguel',

    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: 350, h: 600 },
    FPS: 60,
    framesIndex: 0,
    keys: {
        LEFT: 'ArrowLeft',
        RIGTH: 'ArrowRight',
        SPACE: ' '
    },
    player: undefined,
    playerLeft: false,
    playerRight: false,
    playerSize: { w: 50, h: 50 },
    playerPos: { x: undefined, y: undefined },

    // darle valor a:
    // playerVel, gravity, posY0

    init() {
        this.setContext()
        this.setDimensions()
        this.createPlayer()
        this.setEventListeners()
        this.start()
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.framesIndex++
            console.log(this.playerLeft)
            console.log(this.playerRight)

        }, 1000 / this.FPS)

    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimensions() {
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeydown = evt => {
            if (evt.key === this.keys.LEFT) this.playerLeft = true
            if (evt.key === this.keys.RIGTH) this.playerRight = true
            //if (evt.key === this.keys.SPACE) this.jump()
        }
        document.onkeyup = evt => {
            if (evt.key === this.keys.LEFT) this.playerLeft = false
            if (evt.key === this.keys.RIGTH) this.playerRight = false
        }

    },


    // jump() {
    //     this.playerPos.y -= 40;
    //     this.playerVel -= 8;
    // },

    createPlayer() {
        this.playerPos = {
            x: this.canvasSize.w / 2 - this.playerSize.w / 2,
            y: this.canvasSize.h - this.playerSize.h * 2
        }
        this.player = new Player(this.ctx, this.canvasSize, this.playerSize, this.playerPos, this.playerLeft, this.playerRight)
    },

    drawAll() {
        this.player.draw()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    }

}