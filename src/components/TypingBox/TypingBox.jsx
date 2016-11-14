import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { autobind } from 'core-decorators'

@observer
class TypingBox extends React.Component {
    @observable typed = ''

    error = false

    constructor() {
        super()
    }

    @autobind
    _handleFocus() {
        this.refs.textArea.focus()
    }

    @autobind
    @action _handleChange(e) {
        const value = e.target.value

        this.error = false

        if (value.length <= this.props.text.length) this.typed = value
    }

    @autobind
    _handleBlur(e) {
        e.target.focus()
    }

    @autobind
    _getStatus(char, index) {
        const typedChar = this.typed[index]
        const last = index === this.typed.length

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
        const { text } = this.props

        return (
            <div className="typing-box">
                <textarea
                    className="typing-box__input"
                    ref="textArea"
                    id="input"
                    onChange={ this._handleChange }
                    onBlur={ this._handleBlur }
                    value={ this.typed }
                />

                <div
                    className="text-container"
                    onClick={ this._handleFocus }
                >
                    { this._renderText(text) }
                </div>
            </div>
        )
    }
}

export default TypingBox
