import React, {Component} from 'react'
import {connect} from "react-redux";


class ListOfParts extends Component {
    state = {
        actuators: 'none',
        back_plates: 'none',
        bearing_housings: 'none',
        compressor_wheels: 'none',
        gasket_kits: 'none',
        heat_shields: 'none',
        KODE_CHRAs: 'none',
        nozzles: 'none',
        repair_kits: 'none',
        turbine_wheels: 'none'
    }

    functionForToggler(statePart) {
        if (this.state[`${statePart}`] === 'none') {
            this.setState({[statePart]: 'block'})
        }
        else {
            this.setState({[statePart]: 'none'})
        }
    }

    render() {
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
                                {this.props[`${stateElement}`].map((part, index) => {
                                    return (
                                        <tr id={`${part.part}`}
                                            key={Math.random()}
                                            style={{display: this.state[`${stateElement}`]}}
                                        >
                                            <td>{part.part}</td>
                                            <td>
                                                <button>-</button>
                                            </td>
                                            <td>{part.amount}</td>
                                            <td>
                                                <button
                                                onClick={()=>console.log('aa')}
                                                >+</button>
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

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)
