import React, {Component} from 'react'
import {connect} from "react-redux";
import {addAmount, subtractAmount, findKeyToDelete} from '../state/partsState';
import {addProductToShoppingList} from '../state/shoppingList';
import AddPart from './AddPart'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';

class ListOfParts extends Component {
    state = {
        basicSearchInput: '',
        isDialogOpen: false
    }

    handleOpen() {
        this.setState({isDialogOpen: true})
    }

    handleClose() {
        this.setState({isDialogOpen: false})
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
            'Turbine wheel'
        ]

        return (
            <div>
                <Row middle={'xs'} className={'partsSearchRow'}>
                    <Col xs={6}>
                        <Row end={'xs'}>
                            <Col xs={6}>
                                <TextField
                                    style={{margin: 'auto'}}
                                    fullWidth={true}
                                    id={'idForTextField'}
                                    floatingLabelText={'Search for parts'}
                                    type={"text"}
                                    value={this.state.basicSearchInput}
                                    onChange={(event => {
                                        this.setState({basicSearchInput: event.target.value})
                                        console.log(this.props.findKeyToDelete(event.target.value))
                                    })}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs>
                        <Row start={'xs'} style={{padding: '3px'}}>
                            <Col>
                                <RaisedButton
                                    onClick={() => this.handleOpen()}
                                >
                                    dodaj część
                                </RaisedButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div>
                    <Dialog
                        title="Dodaj nową część"
                        open={this.state.isDialogOpen}
                        onRequestClose={() => this.handleClose()}
                    >
                        <AddPart/>
                    </Dialog>
                </div>
                <Row className={'partsTableDiv'}>
                    {this.props.actuators ?
                        myArrayForState.map((stateElement, i) => {
                            return (
                                <table className="partsTable">
                                    <tbody key={Math.random()}>
                                    {this.props[`${stateElement}`].map((partInStateArray, index) => {
                                        if ((partInStateArray.part.toLocaleLowerCase().includes(this.state.basicSearchInput.toLocaleLowerCase()))
                                            || (partInStateArray.group.toLocaleLowerCase().includes(this.state.basicSearchInput.toLocaleLowerCase())))
                                            return (
                                                <tr id={`${partInStateArray.part}`}
                                                    key={Math.random()}
                                                    className="partsTr"
                                                >
                                                    <td className="partsTd tdName">{arrayForHeadings[i]} {partInStateArray.part}</td>
                                                    <td className="partsTd tdSubtract">
                                                        <button
                                                            className={'partsButton'}
                                                            onClick={() => this.props.subtractAmount(partInStateArray.part)}
                                                        >-
                                                        </button>
                                                    </td>
                                                    <td className="partsTd tdAmount">{partInStateArray.amount}</td>
                                                    <td className="partsTd tdAdd">
                                                        <button
                                                            className={'partsButton'}
                                                            onClick={() => this.props.addAmount(partInStateArray.part)}
                                                        >+
                                                        </button>
                                                    </td>
                                                    <td className="partsTd tdShoppingCart">
                                                        <button
                                                            className={'partsButton partsAddToShoppingListButton'}
                                                            onClick={() => this.props.addProductToShoppingList(partInStateArray.part)}
                                                        >
                                                            <svg id="search-icon" className="search-icon"
                                                                 style={{margin: 'auto'}}
                                                                 height="20"
                                                                 viewBox="0 0 576 512"
                                                            >
                                                                <title>dodaj do listy zakupów</title>
                                                                <path
                                                                    d='M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'/>
                                                            </svg>

                                                        </button>
                                                    </td>

                                                </tr>
                                            )
                                    })
                                    }
                                    </tbody>

                                </table>
                            )
                        })
                        : "loading"
                    }
                </Row>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts,
    products: state.shoppingListState.products,
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
    findKeyToDelete: (objectToFind) => dispatch(findKeyToDelete(objectToFind)),
    addProductToShoppingList: (part) => dispatch(addProductToShoppingList(part)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)