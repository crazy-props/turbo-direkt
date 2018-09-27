import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBarMini from "./AppBar/DashboardAppBarFor";
import './../App.css';
import ListOfCarso from "./Cars/CustomTable";
import AppFooter from "./AppFooter/AppFooter";
import InputForm from "./Cars/InputFormListofCars";

class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <AppBarMini/>
                    <InputForm/>
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
