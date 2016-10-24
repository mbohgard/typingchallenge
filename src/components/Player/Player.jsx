import React from 'react'

import './Player.scss'

const avatar =
    'http://40.media.tumblr.com/62ce3f1d7ffdad447bd7332d49df76d9/tumblr_nmw8mdmvyl1s3hp12o1_1280.jpg'

const Player = ({ type }) => (
    <div className={ 'player player--' + type }>
        <div className="player__details">
            <div
                style={ { backgroundImage: `url(${avatar})` } }
                className="player__details-avatar"
            />
        </div>
        <h2 className="player__name">seriah_killah</h2>
        <div className="player__status">
            <div className="player__status-section player__status-section--chars">
                382
                <div className="label">chars<br />/min</div>
            </div>
            <div className="player__status-section player__status-section--done">
                14
                <div className="label">%<br /> done</div>
            </div>
        </div>
    </div>
)

export default Player
