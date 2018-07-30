import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBarMini from "./DashboardAppBarFor";
import FormLoginOnStartup from "./FormLoginOnStartup";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './../App.css';

class Dashboard extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <AppBarMini/>
                    <FormLoginOnStartup/>
                </div>
            </MuiThemeProvider>
        )
    }
}


const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
