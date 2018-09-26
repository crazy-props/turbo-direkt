import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBarMini from "./DashboardAppBarFor";
import './../App.css';
import ListOfCarso from "./CustomTable";
import AppFooter from "./AppFooter/AppFooter";

class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <AppBarMini/>
                    <ListOfCarso/>
                    <AppFooter/>

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
