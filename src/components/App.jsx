import React from 'react'
import cn from 'classnames'

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

                <TypingBox
                    // text="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
                    text="hej hopp alla"
                />
            </div>
        )
    }
}

export default App;
