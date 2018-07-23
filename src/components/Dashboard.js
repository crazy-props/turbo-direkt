import React, {Component} from 'react'
import {connect} from "react-redux";


class Dashboard extends Component {
    render() {
        return (
            <div>
                this is dashboard </div>
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
