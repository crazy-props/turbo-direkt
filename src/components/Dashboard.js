import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBarMini from "./AppBar/DashboardAppBarFor";
import './../App.css';
import ListOfCarso from "./Cars/CustomTable";
import AppFooter from "./AppFooter/AppFooter";

class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <AppBarMini/>
                    <ListOfCarso/>
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
