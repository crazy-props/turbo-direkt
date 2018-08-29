import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store'

import './index.css';
import App from './App';
import FormLoginOnStartup from "./components/FormLoginOnStartup";
import  MuiThemeProvider  from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)
