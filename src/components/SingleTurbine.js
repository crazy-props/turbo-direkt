import React, {Component} from 'react'
import {connect} from "react-redux";
class SingleTurbine extends Component {
    render() {
        return (
            <div>
                    <ul><li>{this.props.el}</li></ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    turbo: state.turboState.turbo,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleTurbine)