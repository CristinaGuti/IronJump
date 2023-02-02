const IronJump = {
    name: 'IronJump',
    description: 'Game to jump on multiple platforms',
    version: '2.1',
    license: undefined,
    author: 'Cristina Gutierrez y Daniel de Miguel',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: 400, h: 650 },
    FPS: 60,
    framesCounter: 0,
    difficulty: '',
    gameSpeed: 2,
    keys: {
        LEFT: 'ArrowLeft',
        RIGTH: 'ArrowRight',
        SPACE: ' '
    },
    textPx: 25,
    player: undefined,
    playerName: 'player',
    background: undefined,
    audio: undefined,
    score: 1,
    yourScore: undefined,
    IronJumpScore: [],
    platformTypes: ['standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'standard', 'doubleJump', 'doubleJump', 'smallJump'],
    platformType: '',
    platforms: [],
    platformSize: { w: undefined, h: undefined },
    platformPosition: { x: undefined, y: undefined },

    init(playerName = 'player', difficulty) {
        this.playerName = playerName
        this.difficulty = difficulty

        this.setContext()
        this.setDimensions()

        this.checkDifficulty()

        this.createPlayer()
        this.createBackground()
        this.createInitialPlatforms()
        this.createAudio()
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

            this.checkGameOver()

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
        this.background = new Background(this.ctx, this.canvasSize, this.gameSpeed)
    },

    createAudio() {
        this.audio = new Audios(this.ctx)
    },

    generatePlatforms() {
        let frames

        if (this.difficulty == 'hard') {
            frames = 20
        } else frames = 40

        if (this.framesCounter % frames === 0) {

            if (this.difficulty == 'hard') {
                this.platformSize = { w: 40, h: 10 }
            } else this.platformSize = { w: 50, h: 10 }

            this.platformPosition = {
                x: Math.random() * (this.canvasSize.w - this.platformSize.w),
                y: (-this.platformSize.h)
            }

            this.platformType = this.platformTypes[Math.floor(Math.random() * (this.platformTypes.length))]
            this.platforms.push(new Platform(this.ctx, this.platformSize, this.platformPosition, this.gameSpeed, this.platformType))
        }
    },

    createInitialPlatforms() {
        for (let i = 100; i < this.canvasSize.h; i += 120) {
            this.platformSize = { w: 200, h: 10 }
            this.platformPosition = {
                x: Math.random() * (this.canvasSize.w - this.platformSize.w),
                y: i
            }
            this.platforms.push(new Platform(this.ctx, this.platformSize, this.platformPosition, this.gameSpeed))
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

    checkDifficulty() {
        if (this.difficulty == 'hard') {
            this.gameSpeed = 3
            this.FPS = 70
        }
    },

    printScore() {
        this.ctx.fillStyle = 'black'
        this.ctx.font = '25px Indie Flower'
        this.ctx.fillText(`Score: ${this.score}`, 10, 30)
    },

    saveScore() {
        this.IronJumpScore = JSON.parse(localStorage.getItem('IronJumpScore'))

        if (!Array.isArray(this.IronJumpScore)) {
            this.IronJumpScore = []
        }

        this.yourScore = { Name: this.playerName, Difficulty: this.difficulty, Score: this.score }

        this.IronJumpScore.push(this.yourScore)

        localStorage.setItem('IronJumpScore', JSON.stringify(this.IronJumpScore))
    },

    printSaveScore() {
        this.textPx = 30
        this.ctx.font = `${this.textPx}px Indie Flower`

        let pos = 0

        this.IronJumpScore = JSON.parse(localStorage.getItem('IronJumpScore'))

        this.IronJumpScore.forEach(elm => {
            this.ctx.fillText(`${elm.name} - ${elm.difficulty} - ${elm.score}`, 0, this.canvasSize.h / 2 + pos)
            pos += 25
        })
    },

    checkGameOver() {
        if (this.player.position.y > this.canvasSize.h + this.player.size.h) {

            this.saveScore()

            clearInterval(this.interval)

            this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)

            this.textPx = 75
            this.ctx.font = `${this.textPx}px Indie Flower`
            this.ctx.fillText('Game', 90, this.canvasSize.h / 6)
            this.ctx.fillText('Over', 110, this.canvasSize.h / 6 + 75)

            //this.printSaveScore()

            setTimeout(() => location.reload(), 8000)

            this.audio.reproduce('gameOver')
        }
    },

    funnyText() {
        this.textPx = 50
        this.ctx.font = `${this.textPx}px Indie Flower`

        // const phrasesGerman = ['!Super!', '!Party!', '!Que calor!', 'All Right!', 'TIKI TIKI']
        // const phrases = phrasesGerman[Math.floor(Math.random() * (phrasesGerman.length))]
        // let stateScore
        // if (this.score % 10 === 0) stateScore = true
        // if (stateScore) {
        //     this.ctx.fillText(phrases, this.canvasSize.w / 3, this.canvasSize.h / 2)
        //     this.audio.reproduce(phrases)
        //     stateScore = false
        // }

        if (this.score >= 80 && this.score <= 90) {
            this.ctx.fillText('!Super!', this.canvasSize.w / 3, this.canvasSize.h / 2)
            this.audio.reproduce('!Super!')
        }
        else if (this.score >= 160 && this.score <= 170) {
            this.ctx.fillText('!Party!', this.canvasSize.w / 4, this.canvasSize.h / 2)
            this.audio.reproduce('!Party!')
        }
        else if (this.score >= 240 && this.score <= 250) {
            this.ctx.fillText('!Que calor!', this.canvasSize.w / 4, this.canvasSize.h / 2)
            this.audio.reproduce('!Que calor!')
        }
        else if (this.score >= 320 && this.score <= 330) {
            this.ctx.fillText('All Right!', this.canvasSize.w / 4, this.canvasSize.h / 2)
            this.audio.reproduce('All Right!')
        }
        else if (this.score >= 400 && this.score <= 410) {
            this.ctx.fillText('TIKI TIKI', this.canvasSize.w / 4, this.canvasSize.h / 2 - 50)
            this.ctx.fillText('MIAU MIAU', this.canvasSize.w / 4, this.canvasSize.h / 2 + 50)
            this.audio.reproduce('TIKI TIKI')
        }
    }
}