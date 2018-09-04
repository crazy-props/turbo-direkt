import React, {Component} from 'react';

import {connect} from "react-redux";


/**
 * `AutoComplete` search text can be implemented as a controlled value,
 * where `searchText` is handled by state in the parent component.
 * This value is reset with the `onNewRequest` callback.
 */
class Auto extends Component {
    state = {

    };





    render() {
        let cars = this.props.cars;
        var colors=(cars && cars.length?cars.map(car=>car.turbo_OEM).reduce((red,val)=>red.concat(val), []).filter(function (a, b, c) {
            return c.indexOf(a) === b;
        }) :['waitnig'])

        return (
            <div>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    cars: state.carsState.cars,
})

export default connect(
    mapStateToProps,

)(Auto)