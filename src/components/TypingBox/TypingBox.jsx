import React from 'react'
import { observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import GameStore from 'stores/GameStore'

@observer
class TypingBox extends React.Component {
    error = false

    constructor() {
        super()
    }

    @autobind
    _handleFocus() {
        this.refs.textArea.focus()
    }

    @autobind
    _handleChange(e) {
        const value = e.target.value

        this.error = false
        GameStore.input(value)
    }

    @autobind
    _handleBlur(e) {
        e.target.focus()
    }

    @autobind
    _getStatus(char, index) {
        const typedChar = GameStore.typed[index]
        const last = index === GameStore.typed.length

        if (last) return 'cursor'

        return typedChar && char === typedChar
    }

    _renderLetter(char, status, index) {
        let className = ''

        if (status === false) {
            className = 'err'

            this.error = true
        } else if (status === true) {
            className = this.error ? 'err' : 'ok'
        } else if (typeof status === 'string') {
            className = status
        }

        const props = {
            key: `${char}-${index}`,
            id: `c${index}`,
            className
        }

        return <i { ...props }>{ char }</i>
    }

    _renderText(text) {
        if (!text) return ''

        let char
        let status
        let string = []

        for (let i = 0; i < text.length; i++) {
            char = text[i]
            status = this._getStatus(char, i)

            string.push(this._renderLetter(char, status, i))
        }

        return string
    }

    render() {
        return (
            <div className="typing-box">
                <textarea
                    className="typing-box__input"
                    ref="textArea"
                    id="input"
                    onChange={ this._handleChange }
                    onBlur={ this._handleBlur }
                    value={ GameStore.typed }
                />

                <div
                    className="text-container"
                    onClick={ this._handleFocus }
                >
                    { this._renderText(GameStore.text) }
                </div>
            </div>
        )
    }
}

export default TypingBox
