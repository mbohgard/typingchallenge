import React from 'react'
import { observer } from 'mobx-react'

import PlayerStore from 'stores/PlayerStore'
import GameStore from 'stores/GameStore'
import RTCStore from 'stores/RTCStore'

import './Player.scss'

const unsetAvatar =
    'http://40.media.tumblr.com/62ce3f1d7ffdad447bd7332d49df76d9/tumblr_nmw8mdmvyl1s3hp12o1_1280.jpg'

const Player = observer(({ type }) => {
    const player1 = type === '1'
    const stats = player1 ? GameStore.stats : RTCStore.stats
    const name = player1 ? PlayerStore.name : RTCStore.player.name
    const avatar = player1 ? PlayerStore.avatarUrl : RTCStore.player.avatarUrl

    return (
        <div className={ 'player player--' + type }>
            <div className="player__details">
                <div
                    style={ { backgroundImage: `url(${avatar || unsetAvatar})` } }
                    className="player__details-avatar"
                />
                <h2 className="player__name">{ name || 'unset' }</h2>
            </div>

            <div className="player__status">
                <div className="player__status-section player__status-section--chars">
                    { Math.round(stats.charsPerMin) }
                    <div className="label">chars<br />/min</div>
                </div>
                <div className="player__status-section player__status-section--done">
                    { Math.floor(stats.donePercentage) }
                    <div className="label">%<br /> done</div>
                </div>
            </div>
        </div>
    )
})

export default Player
