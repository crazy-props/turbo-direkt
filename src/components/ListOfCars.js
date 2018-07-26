import React, {Component} from 'react'
import {connect} from "react-redux";
import _ from 'lodash';

class ListOfCars extends Component {


    sortNameUp() {
        this.state.carsState.cars({
            cars:
                _.orderBy(this.props.cars, ['Mark'], ['asc', 'desc'])
        })
    }
    render() {
        return this.props.cars === null ?
            <span>Loading .... </span>
            :
            <table>
                <thead>
                <tr>
                    <th>Mark</th>
                    <th>Model</th>
                    <th>Date</th>
                    <th>Capacity</th>
                    <th>No.</th>
                    <th>Power</th>
                    <th>Turbo OEM</th>
                </tr>
                </thead>
                <tbody>
                {this.props.cars.map(
                    el =>
                        <tr>
                            <td>{el.mark.sortNameUp}</td>
                            <td>{el.model}</td>
                            <td>{el.date}</td>
                            <td>{el.capacity}</td>
                            <td>{el.no}</td>
                            <td>{el.power}</td>
                            <td>{el.turbo_OEM}</td>
                        </tr>
                )}
                </tbody>
            </table>

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
