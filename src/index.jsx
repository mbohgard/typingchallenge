import React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import { AppContainer } from 'react-hot-loader'

import App from 'components/App'

import './styles/main.scss'

useStrict(true)

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('components/App', () => {
        const NextApp = require('components/App').default

        render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            document.getElementById('root')
        )
    })
}
