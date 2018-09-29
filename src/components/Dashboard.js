import React, { Component } from 'react'

import FavoritesParts from './FavoritesParts';
import './../App.css';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="App">
                <FavoritesParts />
            </div>)
    }
}