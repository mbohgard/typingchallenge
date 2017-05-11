import { observable, action } from 'mobx'
import { autobind } from 'core-decorators'

class UIStateStore {
    @observable forms = {
        player: {
            name: {
                value: '',
                test: /^[a-zA-Z0-9_-]*$/
            },
            avatarUrl: {
                value: ''
            }
        }
    }

    @autobind
    @action inputChange(type, value) {
        const rule = this.forms.player[type].test

        if (new RegExp(rule).test(value)) {
            this.forms.player[type].value = value

        }
    }
}

export default new UIStateStore()
