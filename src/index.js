import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider } from 'material-ui'
import { Provider } from 'react-redux'
import { store } from './store'

import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)
