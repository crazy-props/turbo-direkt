import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store} from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import './index.css';
import App from './App';

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
)
