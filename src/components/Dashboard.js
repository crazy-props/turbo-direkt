import React, {Component} from 'react'
import {connect} from "react-redux";

import './../App.css';

import InputForm from "./Cars/InputFormListofCars";

class Dashboard extends Component {
    render() {
        return (

                <div className="App">

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
