import { autorun, observable } from 'mobx'
import { autobind } from 'core-decorators'

import GameStore from 'stores/GameStore'

class RTCStore {
    @observable stats = {
        totalLength: 0,
        typedLength: 0,
        correctLength: 0,
        donePercentage: 0,
        charsPerMin: 0
    }

    @observable player = {
        name: null,
        avatarUrl: null
    }

    constructor() {
        this.disposer = autorun(() => {
            this.sendStats(GameStore.stats)
        })
    }

    @autobind
    sendStats(stats) {
        // console.log('sending', stats)
    }
}

export default new RTCStore()
