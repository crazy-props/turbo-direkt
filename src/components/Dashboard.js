import React, {Component} from 'react'
import {connect} from "react-redux";
import './../App.css';
import ListOfCarso from "./CustomTable";
import {logOut} from "../state/authState";

class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <ListOfCarso/>

                </div>

        )
    }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
