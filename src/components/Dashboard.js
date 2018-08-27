import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBarMini from "./DashboardAppBarFor";
import './../App.css';
import Count from "./test";


class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <AppBarMini/>
                    <Count/>
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
