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
    score: 0,
    platformTypes: ['standard', 'doubleJump', 'broken'],
    platformType: '',
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

            this.checkCollision()

            this.generatePlatforms()
            this.clearPlatforms()

            this.framesCounter++

            if (this.framesCounter % 10 === 0) this.score++

            if (this.player.position.y > this.canvasSize.h + 20) { this.gameOver() }


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
        if (this.framesCounter % 20 === 0) {
            this.platformSize = { w: 60, h: 10 }
            this.platformPosition = {
                x: Math.random() * (this.canvasSize.w - this.platformSize.w),
                y: (-this.platformSize.h)
            }
            this.platformType = this.platformTypes[Math.floor(Math.random() * (this.platformTypes.length))]

            this.platforms.push(new Platform(this.ctx, this.platformSize, this.platformPosition, this.platformType))
        }
    },

    initialPlatforms() {
        for (let i = 100; i < this.canvasSize.h; i += 150) {
            this.platformSize = { w: 200, h: 10 }
            this.platformPosition = {
                x: Math.random() * (this.canvasSize.w - this.platformSize.w),
                y: i
            }
            this.platforms.push(new Platform(this.ctx, this.platformSize, this.platformPosition))
        }
    },

    clearPlatforms() {
        this.platforms = this.platforms.filter(eachPlatform => eachPlatform.position.y <= this.canvasSize.h)
    },

    drawAll() {
        this.player.draw()
        this.drawScore()

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
                this.player.jumpCollision(eachPlatform.type)
            }
        })
    },

    drawScore() {
        this.ctx.fillStyle = 'black'
        this.ctx.font = '25px sans-serif'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(`Score: ${this.score}`, 150, 50)
    },

    gameOver() {
        clearInterval(this.setInterval) // no funciona bien
        // alert('Game Over')
        location.reload()
    }
}