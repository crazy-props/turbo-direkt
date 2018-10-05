import React, {Component} from 'react'
import {connect} from "react-redux";
import FavoriteParts from './FavoriteParts/FavoriteParts';


import './../App.css';


class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <FavoriteParts/>
                </div>

        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
