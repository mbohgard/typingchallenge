import { autorun } from 'mobx'
import { autobind } from 'core-decorators'

import GameStore from 'stores/GameStore'

class RTCStore {
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
