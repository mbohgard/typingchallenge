import { observable, action } from 'mobx'
import { autobind } from 'core-decorators'

class PlayerStore {
    @observable name = null
    @observable avatarUrl = null

    @autobind
    @action setName(name) {
        this.name = name
    }

    @autobind
    @action setAvatar(url) {
        this.avatarUrl = url
    }
}

export default new PlayerStore()
