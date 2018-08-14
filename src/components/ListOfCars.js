import React, {Component} from 'react'
import {connect} from "react-redux";
import _ from 'lodash';
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"
import {fckSort} from "../firebase";

class ListOfCars extends Component {

    render() {

        let cars = this.props.cars;
        cars = _.orderBy(cars, ['mark'],['asc'])
        return this.props.cars === null ?
            <Spinner/>
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
fckSort()
              /*  {cars.map(
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

                                { el.turbo_OEM && el.turbo_OEM.length?
                                    el.turbo_OEM.filter(function (a, b, c) {
                                    return c.indexOf(a) === b;
                                    }).map(el=><a href="http://localhost:3000/turbines"><SingleTurbine
                                        el={el}/></a>
                            ):
                                    el.turbo_OEM
                                } </tr>
                            </td>
                        </tr>
                )}*/


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
