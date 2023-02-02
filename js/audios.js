class Audios {

    constructor(ctx) {

        this.ctx = ctx

        this.init()

    }

    init() {
        this.superAudio = new Audio("./audio/super.mp3")
        this.partyAudio = new Audio("./audio/party.mp3")
        this.queCalorAudio = new Audio("./audio/queCalor.mp3")
        this.allRigthAudio = new Audio("./audio/All-right.mp3")
        this.tikitikiAudio = new Audio("./audio/tikitiki.mp3")
        this.gameOverAudio = new Audio("./audio/dead.mp3")
        this.initAudio = new Audio("./audio/Good-Charlotte.mp3")
    }

    reproduce(name) {
        switch (name) {
            case 'init':
                this.initAudio.play()
                break
            case '!Super!':
                this.superAudio.play()
                break
            case '!Party!':
                this.partyAudio.play()
                break
            case '!Que calor!':
                this.queCalorAudio.play()
                break
            case 'All Right!':
                this.allRigthAudio.play()
                break
            case 'TIKI TIKI':
                this.tikitikiAudio.play()
                break
            case 'gameOver':
                this.gameOverAudio.play()
                break
        }
    }
}   
