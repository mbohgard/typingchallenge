import React from 'react'
import { autobind } from 'core-decorators'

class TypingBox extends React.Component {
    @autobind
    _handleFocus() {
        this.refs.textArea.focus()
    }

    @autobind
    _handleChange(e) {
        console.log(e.target.value)
    }

    _renderLetter(letter, index) {
        const props = {
            key: `${letter}-${index}`,
            id: `l${index}`
        }

        return <i { ...props }>{ letter }</i>
    }

    _renderText(text) {
        if (!text) return ''

        let string = []

        for (let i = 0; i < text.length; i++) {
            string.push(this._renderLetter(text[i], i))
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
                    onChange={ this._handleChange }
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
