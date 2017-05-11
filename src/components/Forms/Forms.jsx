import React from 'react'
import { observer } from 'mobx-react'

import UIStateStore from 'stores/UIStateStore'
import PlayerStore from 'stores/PlayerStore'

import './Forms.scss'

@observer
class Forms extends React.Component {
    constructor() {
        super()

        this._submitPlayer = this._submitPlayer.bind(this)
        this._renderPlayerForms = this._renderPlayerForms.bind(this)
    }

    componentDidMount() {
        this.name.focus()
    }

    _submitPlayer(e) {
        e.preventDefault()

        PlayerStore.setPlayerInfo(UIStateStore.forms.player)
    }

    _handleChange(type, e) {
        const value = e.target.value

        UIStateStore.inputChange(type, value)
    }

    _renderPlayerForms() {
        const { name, avatarUrl } = UIStateStore.forms.player

        return (
            <form className="forms__player" onSubmit={ this._submitPlayer }>
                <h2 className="forms__title">
                    Enter your information
                </h2>

                <label className="forms__element">
                    <h5 className="forms__element-title">Call sign:</h5>
                    <input
                        type="text"
                        className="forms__input"
                        onChange={ this._handleChange.bind(this, 'name') }
                        value={ name.value }
                        ref={ (el) => { this.name = el } }
                    />
                </label>

                <label className="forms__element">
                    <h5 className="forms__element-title">Avatar URL:</h5>
                    <input
                        type="text"
                        className="forms__input"
                        onChange={ this._handleChange.bind(this, 'avatarUrl') }
                        value={ avatarUrl.value }
                    />
                </label>

                <div className="forms__element">
                    <button className="forms__button">Save</button>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className="forms">
                { this._renderPlayerForms() }
            </div>
        )
    }
}

export default Forms
