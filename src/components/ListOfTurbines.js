import React, { Component } from 'react'
import { connect } from "react-redux";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class ListOfTurbines extends Component {
    render() {

        return this.props.turbo === null ?
            <span>Loading .... </span>
            :
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Turbo OEM</TableHeaderColumn>
                        <TableHeaderColumn>Compressor Wheel</TableHeaderColumn>
                        <TableHeaderColumn>Turbine Wheel</TableHeaderColumn>
                        <TableHeaderColumn>Bearing Housing</TableHeaderColumn>
                        <TableHeaderColumn>Back Plate</TableHeaderColumn>
                        <TableHeaderColumn>Heat Shield</TableHeaderColumn>
                        <TableHeaderColumn>Actuator</TableHeaderColumn>
                        <TableHeaderColumn>Noozles</TableHeaderColumn>
                        <TableHeaderColumn>Gasket Kit</TableHeaderColumn>
                        <TableHeaderColumn>Repair Kit</TableHeaderColumn>
                        <TableHeaderColumn>KODE CHRA</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.turbo.map(
                        x =>
                            <TableRow key={x.key}>
                                <TableRowColumn>{x.turboOEM}</TableRowColumn>
                                <TableRowColumn>{x.compressor_wheel}</TableRowColumn>
                                <TableRowColumn>{x.turbine_wheel}</TableRowColumn>
                                <TableRowColumn>{x.bearing_housing}</TableRowColumn>
                                <TableRowColumn>{x.back_plate}</TableRowColumn>
                                <TableRowColumn>{x.heat_shield}</TableRowColumn>
                                <TableRowColumn>{x.nozzles}</TableRowColumn>
                                <TableRowColumn>{x.actuator}</TableRowColumn>
                                <TableRowColumn>{x.gasket_kit}</TableRowColumn>
                                <TableRowColumn>{x.repair_kit}</TableRowColumn>
                                <TableRowColumn>{x.KODE_CHRA}</TableRowColumn>
                            </TableRow>
                    )}
                </TableBody>
            </Table>

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
