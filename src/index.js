import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store} from './store'
import './index.css';
import App from './App';
import Auth from "./components/Auth/Auth.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBarMini from './components/AppBar/DashboardAppBarFor';


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Auth>
                <App />
            </Auth>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)
