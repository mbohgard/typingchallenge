import React from 'react'
import { observer } from 'mobx-react'
import cn from 'classnames'
import DevTools from 'mobx-react-devtools'

import RTCStore from 'stores/RTCStore'
import GameStore from 'stores/GameStore'

import Player from 'components/Player/Player'
import Glimmers from 'components/Glimmers/Glimmers'
import TypingBox from 'components/TypingBox/TypingBox'

import './App.scss'

function addZero(n) {
    return (n < 10 ? '0' : '') + n
}

function msToTime(s) {
    const ms = s % 1000

    s = (s - ms) / 1000
    const secs = s % 60

    s = (s - secs) / 60
    const mins = s % 60

    return addZero(mins) + ':' + addZero(secs) + '.' + Math.round(ms / 100)
}

const GameStatus = observer(() => (
    <div className="game-status game-status--ahead">
        +22
        <div className="label">chars<br />ahead</div>
    </div>
))

const GameTime = observer(() => (
    <div className="game-time">
        { msToTime(GameStore.time) }
    </div>
))

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Glimmers />
                <Glimmers />
                <Glimmers />

                <h1 className="title"></h1>

                <div className="top">
                    <Player type="1" />
                    <GameStatus />
                    <GameTime />
                    <Player type="2" />
                </div>

                <TypingBox />

                <DevTools />
            </div>
        )
    }
}

export default App;
