import { observable, action, computed, autorun } from 'mobx'
import { autobind } from 'core-decorators'

import texts from '../gameTexts'

let gameTimer

function getDoneStats(text, typed) {
    let index;

    for (let i = 0; i < typed.length; i++) {
        if (text[i] !== typed[i]) {
            index = i
            break
        }
    }

    return {
        length: index || typed.length,
        percentage: (typed.length / text.length) * 100
    }
}

class GameStore {
    @observable typed = ''
    @observable texts = texts
    @observable currentTextId = 1
    @observable running = false
    @observable done = false
    @observable gameStart = null
    @observable gameEnd = null
    @observable time = 0 // time elapsed in ms

    constructor() {
        this.disposer = autorun(() => {
            if (this.running) this.startGame()
            else this.endGame()
        })
    }

    @computed get stats() {
        const text = this.texts[this.currentTextId].text
        const doneStats = getDoneStats(text, this.typed)

        return {
            totalLength: text.length,
            typedLength: this.typed.length,
            correctLength: doneStats.length,
            donePercentage: doneStats.percentage,
            charsPerMin: doneStats.length ?
                (doneStats.length / (this.time / 60000)) : 0
        }
    }

    @computed get text() {
        return this.texts[this.currentTextId].text
    }

    @autobind
    @action startGame() {
        this.gameStart = new Date().getTime()

        gameTimer = setInterval(action(() => {
            const now = new Date().getTime()

            this.time = now - this.gameStart
        }), 100)
    }

    @action endGame() {
        if (!this.gameStart) return

        this.gameEnd = new Date().getTime()
        this.done = true

        clearInterval(gameTimer)
    }

    @action input(value) {
        let stats

        if (this.done) return

        if (value.length <= this.texts[this.currentTextId].text.length) {
            this.typed = value

            if (!this.running) this.running = true

            stats = this.stats

            if (stats.totalLength === stats.correctLength) this.running = false
        }
    }
}

export default new GameStore()
