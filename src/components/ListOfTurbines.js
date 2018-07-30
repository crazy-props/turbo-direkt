import React, {Component} from 'react'
import {connect} from "react-redux";


class ListOfTurbines extends Component {
    render() {
        return (
            <div>
                {console.log(this.props.turbo)}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    turbo: state.turboState.turbo,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfTurbines)
