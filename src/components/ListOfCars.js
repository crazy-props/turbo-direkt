import React, {Component} from 'react'
import {connect} from "react-redux";


class ListOfCars extends Component {
    render() {
        return (
            <div>
                {console.log(this.props.cars)}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    cars: state.carsState.cars,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfCars)
