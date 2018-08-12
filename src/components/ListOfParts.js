import React, {Component} from 'react'
import {connect} from "react-redux";
import {addAmount, subtractAmount, findKeyToDelete} from '../state/partsState';
import AddPart from './AddPart'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col} from 'react-grid-system';
import Dialog from 'material-ui/Dialog';

class ListOfParts extends Component {
    state = {
        basicSearchInput: '',
        actuators: 'none',
        back_plates: 'none',
        bearing_housings: 'none',
        compressor_wheels: 'none',
        gasket_kits: 'none',
        heat_shields: 'none',
        KODE_CHRAs: 'none',
        nozzles: 'none',
        repair_kits: 'none',
        turbine_wheels: 'none',
        isDialogOpen: false
    }

    functionForToggler(statePart) {
        if (this.state[`${statePart}`] === 'none') {
            this.setState({[statePart]: 'block'})
        }
        else {
            this.setState({[statePart]: 'none'})
        }
    }

    handleOpen() {
        this.setState({isDialogOpen: true})
    }

    handleClose() {
        this.setState({isDialogOpen: false})
    }

    render() {
        // const actions = [
        //     <FlatButton
        //         label="Ok"
        //         primary={true}
        //         onClick={() => this.handleClose()}
        //     />,
        // ];

        let myArrayForState = ['actuators',
            'back_plates',
            'bearing_housings',
            'compressor_wheels',
            'gasket_kits',
            'heat_shields',
            'KODE_CHRAs',
            'nozzles',
            'repair_kits',
            'turbine_wheels']

        let arrayForHeadings = ['Actuator',
            'Back plate',
            'Bearing housing',
            'Compressor wheel',
            'Gasket kit',
            'Heat shield',
            'KODE CHRA',
            'Nozzle',
            'Repair kit',
            'Turbine wheel']

        return (
            <div>
                <Row>
                    <Col sm={6}>
                        <TextField
                            id={'idForTextField'}
                            fullWidth={true}
                            floatingLabelText={'Search for parts'}
                            type={"text"}
                            value={this.state.basicSearchInput}
                            onChange={(event => {
                                this.setState({basicSearchInput: event.target.value})
                                console.log(this.props.findKeyToDelete(event.target.value))
                            })}
                        />
                    </Col>
                    <Col sm={6}>
                        <RaisedButton
                            style={{width: '50%', marginTop: '14px'}}
                            onClick={() => this.handleOpen()}
                        >
                            dodaj część
                        </RaisedButton>
                    </Col>
                </Row>
                <div>
                    <Dialog
                        title="Dodaj nową część"
                        // actions={actions}
                        open={this.state.isDialogOpen}
                        onRequestClose={() => this.handleClose()}
                    >
                        <AddPart/>
                    </Dialog>
                </div>
                {this.props.actuators ?
                    <table>
                        <thead>
                        <tr>
                            <th>part</th>
                            <th>decrease</th>
                            <th>amount</th>
                            <th>increase</th>
                        </tr>
                        </thead>
                        {myArrayForState.map((stateElement, i) => {
                            return (
                                <tbody key={Math.random()}>
                                <tr onClick={() => this.functionForToggler(stateElement)}
                                    key={Math.random()}
                                >
                                    <td colSpan={4}>
                                        {arrayForHeadings[i]}
                                    </td>
                                </tr>
                                {this.props[`${stateElement}`].map((partInStateArray, index) => {
                                    if (partInStateArray.part.includes(this.state.basicSearchInput))
                                        return (
                                            <tr id={`${partInStateArray.part}`}
                                                key={Math.random()}
                                                style={{display: this.state[`${stateElement}`]}}
                                            >
                                                <td>{partInStateArray.part}</td>
                                                <td>
                                                    <button
                                                        onClick={() => this.props.subtractAmount(partInStateArray.part)}
                                                    >-
                                                    </button>
                                                </td>
                                                <td>{partInStateArray.amount}</td>
                                                <td>
                                                    <button
                                                        onClick={() => this.props.addAmount(partInStateArray.part)}
                                                    >+
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                })
                                }
                                </tbody>
                            )
                        })
                        }

                    </table>
                    : "loading"
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts,
    actuators: state.partsState.actuators,
    back_plates: state.partsState.back_plates,
    bearing_housings: state.partsState.bearing_housings,
    compressor_wheels: state.partsState.compressor_wheels,
    gasket_kits: state.partsState.gasket_kits,
    heat_shields: state.partsState.heat_shields,
    KODE_CHRAs: state.partsState.KODE_CHRAs,
    nozzles: state.partsState.nozzles,
    repair_kits: state.partsState.repair_kits,
    turbine_wheels: state.partsState.turbine_wheels

})

const mapDispatchToProps = dispatch => ({
    addAmount: (objectToAdd) => dispatch(addAmount(objectToAdd)),
    subtractAmount: (objectToSubtract) => dispatch(subtractAmount(objectToSubtract)),
    findKeyToDelete: (objectToFind) => dispatch(findKeyToDelete(objectToFind))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)
