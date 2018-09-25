import React, { Component } from 'react'
import { connect } from "react-redux";
import AppBarMini from "./DashboardAppBarFor";
import './../App.css';
import ListOfCarso from "./CustomTable";

class Dashboard extends Component {
    render() {
        return (
            <div className="App">
                <AppBarMini />
                <ListOfCarso />
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
