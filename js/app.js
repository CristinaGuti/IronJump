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
    framesCounter: 0,
    keys: {
        LEFT: 'ArrowLeft',
        RIGTH: 'ArrowRight',
        SPACE: ' '
    },
    player: undefined,
    obstacle: [],
    initDistObstacles: 50,


    init() {
        this.setContext()
        this.setDimensions()
        this.createPlayer()
        this.initObstacle()
        this.setEventListeners()
        this.start()
    },

    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()

            this.generateObstacle()
            this.clearObstacles()

            this.checkCollision()

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

    generateObstacle() {
        if (this.framesCounter % 50 === 0) {
            this.obstacle.push(new Obstacle(this.ctx, this.canvasSize))
        }
    },

    initObstacle() {
        for (let i = 0; i < this.canvasSize.h; i += this.initDistObstacles) {

            this.obstacle.push(new Obstacle(this.ctx, this.canvasSize))
        }
    },

    clearObstacles() {
        this.obstacle = this.obstacle.filter(elm => elm.position.y <= this.canvasSize.h)
    },

    drawAll() {
        this.player.draw()

        this.obstacle.forEach(elm => elm.draw())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    checkCollision() {
        this.obstacle.forEach(elm => {
            if (this.player.position.x + this.player.size.w >= elm.position.x &&
                this.player.position.x <= elm.position.x + elm.size.w &&
                this.player.position.y + this.player.size.h >= elm.position.y &&
                this.player.position.y + this.player.size.h <= elm.position.y + elm.size.h) {
                this.player.collision = true
            } //else this.player.collision = false
        })
    }
}