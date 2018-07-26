import React, { Component } from 'react'
import { connect } from "react-redux";


class ListOfTurbines extends Component {
    render() {

        return this.props.turbo === null ?
            <span>Loading .... </span>
            :
            <table>
                <thead>
                    <tr>
                        <th>Turbo OEM</th>
                        <th>Compressor Wheel</th>
                        <th>Turbine Wheel</th>
                        <th>Bearing Housing</th>
                        <th>Back Plate</th>
                        <th>Heat Shield</th>
                        <th>Actuator</th>
                        <th>Noozles</th>
                        <th>Gasket Kit</th>
                        <th>Repair Kit</th>
                        <th>KODE CHRA</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.turbo.map(
                        x =>
                            <tr>
                                <td>{x.turboOEM}</td>
                                <td>{x.compressor_wheel}</td>
                                <td>{x.turbine_wheel}</td>
                                <td>{x.bearing_housing}</td>
                                <td>{x.back_plate}</td>
                                <td>{x.heat_shield}</td>
                                <td>{x.nozzles}</td>
                                <td>{x.actuator}</td>
                                <td>{x.gasket_kit}</td>
                                <td>{x.repair_kit}</td>
                                <td>{x.KODE_CHRA}</td>
                            </tr>
                    )}
                </tbody>
            </table>

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
