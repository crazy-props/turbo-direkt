import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBarMini from "./DashboardAppBarFor";
import FormLoginOnStartup from "./FormLoginOnStartup";
import './../App.css';

class Dashboard extends Component {
    render() {
        return (
            <div className="App">
                <AppBarMini/>
                <FormLoginOnStartup/>
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
