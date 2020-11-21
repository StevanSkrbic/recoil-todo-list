import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {RecoilRoot} from 'recoil'
// There is only one recoil root per app and everything within recoil state exists under this recoil root provider
ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
)
