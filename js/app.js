const IronJump = {
    name: 'IronJump',
    description: 'Game to jump on multiple platforms',
    version: '1.3',
    license: undefined,
    author: 'Cristina Gutierrez y Daniel de Miguel',

    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: 350, h: 600 },
    FPS: 60,
    framesCounter: 0,
    keys: {
        LEFT: 'ArrowLeft',
        RIGTH: 'ArrowRight',
        SPACE: ' '
    },
    player: undefined,
    platforms: [],
    platformSize: { w: undefined, h: undefined },
    platformPosition: { x: undefined, y: undefined },

    init() {
        this.setContext()
        this.setDimensions()
        this.createPlayer()
        this.initialPlatforms()
        this.setEventListeners()
        this.start()
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            console.log(this.platforms)
            this.generatePlatforms()
            this.clearPlatforms()

            // this.checkCollision()
            // this.checkInitCollision()
            this.framesCounter++

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
            if (evt.key === this.keys.LEFT) this.player.moveLeft = true
            if (evt.key === this.keys.RIGTH) this.player.moveRight = true
        }
        document.onkeyup = evt => {
            if (evt.key === this.keys.LEFT) this.player.moveLeft = false
            if (evt.key === this.keys.RIGTH) this.player.moveRight = false
        }
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize)
    },

    generatePlatforms() {
        if (this.framesCounter % 30 === 0) {
            this.platformSize = { w: 60, h: 10 }
            this.platformPosition = {
                x: Math.random() * (this.canvasSize.w - this.platformSize.w),
                y: (-this.platformSize.h)
            }
            this.platforms.push(new Platform(this.ctx, this.canvasSize, this.platformSize, this.platformPosition))
        }
    },

    initialPlatforms() {
        this.platformSize = { w: 350, h: 10 }
        this.position = { x: 0, y: 550 }
        this.platforms.push(new Platform(this.ctx, this.canvasSize, this.size, this.position))
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(eachPlatform => eachPlatform.position.y <= this.canvasSize.h)
    },

    drawAll() {
        this.player.draw()

        console.log(this.platforms)
        this.platforms.forEach(eachPlatform => eachPlatform.draw())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    checkCollision() {
        this.platforms.forEach(eachPlatform => {
            if (this.player.position.x + this.player.size.w >= eachPlatform.position.x &&
                this.player.position.x <= eachPlatform.position.x + eachPlatform.size.w &&
                this.player.position.y + this.player.size.h + this.player.speed.y >= eachPlatform.position.y &&
                this.player.position.y + this.player.size.h <= eachPlatform.position.y + eachPlatform.size.h) {
                this.player.collision = true
            }
        })
    },
}