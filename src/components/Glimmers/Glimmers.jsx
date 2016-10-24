import React from 'react'
import cn from 'classnames'
import random from 'lodash/random'

import './Glimmers.scss'

const size = 59
let timer;

class Glimmers extends React.Component {
    constructor() {
        super()
        this.state = {
            type: ''
        }
    }

    componentDidMount() {
        this._draw()
    }

    componentWillUnmount() {
        clearTimeout(timer)
    }

    _getPosition() {
        const width = window.innerWidth
        const height = window.innerHeight
        const center = width / 2

        let widthPoints = Math.floor(width / size)
        const heightPoints = Math.floor(height / size)

        widthPoints = Math.floor(widthPoints - (widthPoints / 2))

        const pointX = random(-widthPoints, widthPoints) * size
        const pointY = random(1, heightPoints) * size

        // try again if out of bounds
        if (
            (pointX + size) > center
            || (pointX - size < (center - width))
            || (pointY + size) > height
            || (pointY - size) < 0
        ) {
            this._getPosition()
            return
        }

        return {
            marginLeft: pointX + (size / 2),
            top: pointY
        }
    }

    _getType() {
        const types = [
            'horizontal',
            'horizontal-reverse',
            'vertical',
            'vertical-reverse'
        ]
        const randomIndex = random(0, types.length - 1);

        return types[randomIndex];
    }

    _draw() {
        timer = setTimeout(() => {
            this.setState({ type: '' }, () => {
                this.setState({
                    type: this._getType()
                })

                this._draw();

            })
        }, random(1000, 4000))
    }

    render() {
        const position = this._getPosition()
        const type = this.state.type

        const classes = cn({
            'glim': type,
            'glim--horizontal': type === 'horizontal' || type === 'horizontal-reverse',
            'glim--horizontal--reverse': type === 'horizontal-reverse',
            'glim--vertical': type === 'vertical' || type === 'vertical-reverse',
            'glim--vertical--reverse': type === 'vertical-reverse'
        })

        if (!type) return null

        return (
            <div
                className={ classes }
                style={ position }
                ref="glimmer"
            />
        )
    }
}

export default Glimmers
