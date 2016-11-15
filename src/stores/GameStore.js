import { observable, action, computed } from 'mobx'

import texts from '../gameTexts'

let gameTimer

function getDone(text, typed) {
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

    @computed get stats() {
        const text = this.texts[this.currentTextId].text
        const done = getDone(text, this.typed)

        return {
            totalLength: text.length,
            typedLength: this.typed.length,
            correctLength: done ? done.length : 0,
            donePercentage: done ? done.percentage : 0
        }
    }

    @computed get text() {
        return this.texts[this.currentTextId].text
    }

    @action input(value) {
        if (value.length <= this.texts[this.currentTextId].text.length) {
            this.typed = value
        }
    }
}

export default new GameStore()
