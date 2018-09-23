import React, {Component} from 'react'
import {connect} from "react-redux";
import '../../App.css';
import ListOfCars from "../CustomTable";
import {logOut} from "../../state/authState";

class Dashboard extends Component {
    render() {
        return (

                <div className="App">
                    <ListOfCars/>

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
