import React from 'react'
import cn from 'classnames'
import DevTools from 'mobx-react-devtools'

import Player from 'components/Player/Player'
import Glimmers from 'components/Glimmers/Glimmers'
import TypingBox from 'components/TypingBox/TypingBox'

import './App.scss'

class App extends React.Component {
    componentDidMount() {
        document.getElementById('input').focus()
    }

    render() {
        return (
            <div className="app">
                <Glimmers />
                <Glimmers />
                <Glimmers />

                <h1 className="title"></h1>

                <div className="top">
                    <Player type="1" />
                    <div className="game-status game-status--ahead">
                        +22
                        <div className="label">chars<br />ahead</div>
                    </div>
                    <Player type="2" />
                </div>

                <TypingBox />

                <DevTools />
            </div>
        )
    }
}

export default App;
