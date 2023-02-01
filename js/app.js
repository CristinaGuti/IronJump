const IronJump = {
    name: 'IronJump',
    description: 'Game to jump on multiple platforms',
    version: '2.0',
    license: undefined,
    author: 'Cristina Gutierrez y Daniel de Miguel',

    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: 400, h: 650 },
    FPS: 60,
    framesCounter: 0,
    difficultyHard: false,
    keys: {
        LEFT: 'ArrowLeft',
        RIGTH: 'ArrowRight',
        SPACE: ' '
    },
    textPx: 25,
    player: undefined,
    background: undefined,
    score: 0,
    platformTypes: ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'doubleJump', 'doubleJump', 'broken'],
    platformType: '',
    platforms: [],
    platformSize: { w: undefined, h: undefined },
    platformPosition: { x: undefined, y: undefined },


    init() {
        this.setContext()
        this.setDimensions()
        this.createPlayer()
        this.createBackground()
        this.initialPlatforms()
        this.setEventListeners()
        this.start()
    },

    start() {
        this.interval = setInterval(() => {
            this.clearAll()

            this.drawAll()

            this.generatePlatforms()

            this.checkCollision()

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            if (this.framesCounter % 10 === 0) this.score++

            if (this.player.position.y > this.canvasSize.h + this.player.size.h) this.gameOver()

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

    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize)
    },

    generatePlatforms() {
        if (this.framesCounter % 30 === 0) {
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
        for (let i = 100; i < this.canvasSize.h; i += 120) {
            this.platformSize = { w: 200, h: 10 }
            this.platformPosition = {
                x: Math.random() * (this.canvasSize.w - this.platformSize.w),
                y: i
            }
            this.platforms.push(new Platform(this.ctx, this.platformSize, this.platformPosition))
        }
    },

    drawAll() {
        this.background.draw()
        this.platforms.forEach(eachPlatform => eachPlatform.draw())
        this.player.draw()

        this.printScore()
        this.funnyText()
    },

    clearAll() {
        this.platforms = this.platforms.filter(eachPlatform => eachPlatform.position.y <= this.canvasSize.h)

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

    printScore() {
        this.ctx.fillStyle = 'black'
        this.ctx.font = '25px Indie Flower'
        this.ctx.fillText(`Score: ${this.score}`, 10, 30)
    },

    gameOver() {
        //localStorage.setItem(this.playerName, this.score)
        //localStorage.getItem(this.playerName)

        clearInterval(this.interval)

        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        this.textPx = 100
        this.ctx.font = `${this.textPx}px Indie Flower`
        this.ctx.fillText('Game', 80, this.canvasSize.h / 2 - 50)
        this.ctx.fillText('Over', 110, this.canvasSize.h / 2 + 50)

        setTimeout(() => location.reload(), 3000)
    },

    funnyText() {

        this.textPx = 50
        if (this.score >= 100 && this.score <= 110) {
            this.ctx.font = `${this.textPx}px Indie Flower`
            this.ctx.fillText('Super!', this.canvasSize.w / 3, this.canvasSize.h / 2)
        }
        else if (this.score >= 200 && this.score <= 210) {
            this.ctx.font = `${this.textPx}px Indie Flower`
            this.ctx.fillText('All Right!', this.canvasSize.w / 4, this.canvasSize.h / 2)
        }
        else if (this.score >= 300 && this.score <= 310) {
            this.ctx.font = `${this.textPx}px Indie Flower`
            this.ctx.fillText('Que calor!', this.canvasSize.w / 4, this.canvasSize.h / 2)
        }
        else if (this.score >= 400 && this.score <= 410) {
            this.ctx.font = `${this.textPx}px Indie Flower`
            this.ctx.fillText('TIKI TIKI', this.canvasSize.w / 4, this.canvasSize.h / 2 - 50)
            this.ctx.fillText('MIAU MIAU', this.canvasSize.w / 4, this.canvasSize.h / 2 + 50)
        }
    }
}