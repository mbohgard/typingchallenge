import { observable, action } from 'mobx'
import { autobind } from 'core-decorators'

class PlayerStore {
    @observable name = null
    @observable avatarUrl = null
    @observable ready = true

    @autobind
    @action setPlayerInfo(obj) {
        if (obj.name) this.name = obj.name.value
    }
}

export default new PlayerStore()
