const IronJump = {
    name: 'IronJump',
    description: 'Game to jump on multiple platforms',
    version: '1.0.0',
    license: undefined,
    author: 'Cristina Guitierrez y Daniel de Miguel',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: 300, h: 600 },

    init() {
        this.setContext()
        this.setDimensions()
    },

    setContext() {
        console.log('eh')
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
        console.log(this.ctx)
    },
    setDimensions() {

        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },
}