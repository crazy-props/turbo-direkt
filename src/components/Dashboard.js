import React, {Component} from 'react'
import {connect} from "react-redux";
import AppBar from 'material-ui/AppBar';

class Dashboard extends Component {
    render() {
        return (
            <div>
               <AppBar/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
