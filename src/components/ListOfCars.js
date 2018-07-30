import React, {Component} from 'react'
import {connect} from "react-redux";
import _ from 'lodash';
class ListOfCars extends Component {

    render() {

        let cars = this.props.cars;
        cars = _.orderBy(cars, ['mark'],['asc'])
        return this.props.cars === null ?
            <span>Loading .... </span>
            :
            <table className="table table-striped">
                <thead>
                <tr>
                    <th className="filterable-cell">Mark</th>
                    <th className="filterable-cell">Model</th>
                    <th className="filterable-cell">Date</th>
                    <th className="filterable-cell" >Capacity</th>
                    <th className="filterable-cell">No.</th>
                    <th className="filterable-cell">Power</th>
                    <th className="filterable-cell" >Turbo OEM</th>
                </tr>
                </thead>
                <tbody>

                {cars.map(
                    (el) =>
                        <tr>
                            <td>{el.mark}</td>
                            <td>{el.model}</td>
                            <td>{el.date}</td>
                            <td>{el.capacity}</td>
                            <td>{el.no}</td>
                            <td>{el.power}</td>
                            <td>
                               <tr>
                                   <ol>
                                { el.turbo_OEM && el.turbo_OEM.length?
                                    el.turbo_OEM.filter(function (a, b, c) {
                                    return c.indexOf(a) === b;
                                    }).map(el=><li><a href="{el}">{el}</a>
                            </li>):
                                    el.turbo_OEM
                                } </ol></tr>
                            </td>
                        </tr>
                )}
                </tbody>
            </table>

    }

}

const mapStateToProps = state => ({
    cars: state.carsState.cars,
    turbo: state.turboState.turbo,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfCars)
