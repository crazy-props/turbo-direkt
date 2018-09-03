import React, {Component} from 'react'
import {connect} from "react-redux";
import {addAmount, subtractAmount} from '../state/partsState';
import {addProductToShoppingList} from '../state/shoppingList';
import AddPart from './AddPart'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Row, Col} from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import Pagination from "material-ui-pagination";

class ListOfParts extends Component {
    state = {
        basicSearchInput: '',
        isDialogOpen: false,
        ITEMS_PER_PAGE: 10,
        currentPage: 0
    }

    handleOpen() {
        this.setState({isDialogOpen: true})
    }

    handleClose() {
        this.setState({isDialogOpen: false})
    }

    setStateForSearch(event){
        this.setState({basicSearchInput: event.target.value})
    }

    render() {
        let myArrayForState = ['actuator', 'back_plate', 'bearing_housing', 'compressor_wheel', 'gasket_kit', 'heat_shield', 'KODE_CHRA', 'nozzle', 'repair_kit', 'turbine_wheel']

        let arrayForHeadings = ['Actuator', 'Back plate', 'Bearing housing', 'Compressor wheel', 'Gasket kit', 'Heat shield', 'KODE CHRA', 'Nozzle', 'Repair kit', 'Turbine wheel'
        ]

        let parts = this.props.parts;
        const filter = parts
            .filter(part => {
                    return (part.part.toLowerCase().includes(this.state.basicSearchInput.toLowerCase()))
                        || (part.group.toLowerCase().includes(this.state.basicSearchInput.toLowerCase()))
                }
            )

        const numberOfParts = filter && filter.length
        console.log(filter)

        return (
            <div>
                <Row middle={'xs'} className={'partsSearchRow'}>
                    <Col xs={6}>
                        <TextField
                            style={{margin: 'auto'}}
                            fullWidth={true}
                            id={'idForTextField'}
                            floatingLabelText={'Search for parts'}
                            type={"search"}
                            value={this.state.basicSearchInput}
                            onChange={event => this.setStateForSearch(event)}
                        />

                    </Col>
                    <Col xs>

                        <RaisedButton
                            onClick={() => this.handleOpen()}
                        >
                            dodaj część
                        </RaisedButton>

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
                    <table className="partsTable">
                        <tbody>
                        {filter && filter.length ?
                            filter.filter((el, i) => {
                                return (i >= this.state.ITEMS_PER_PAGE * this.state.currentPage
                                    &&
                                    i < this.state.ITEMS_PER_PAGE * (this.state.currentPage + 1))
                            }).map((partInStateArray, index) =>
                                    <tr id={`${partInStateArray.part}`}
                                        key={`${partInStateArray.part}${index}`}
                                        className="partsTr"
                                    >
                                        <td className="partsTd tdName">{arrayForHeadings[myArrayForState.indexOf(partInStateArray.group)]} {partInStateArray.part}</td>
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

                                    </tr>)
                            : 'loading'
                        }
                        </tbody>

                    </table>
                    }
                </Row>
                <div style={{textAlign: 'center'}}>
                    <Pagination
                        total={Math.ceil(numberOfParts / this.state.ITEMS_PER_PAGE)}
                        current={this.state.currentPage + 1}
                        display={10}
                        onChange={newPage => this.setState({currentPage: newPage - 1})}
                    />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts,
    products: state.shoppingListState.products,
})

const mapDispatchToProps = dispatch => ({
    addAmount: (objectToAdd) => dispatch(addAmount(objectToAdd)),
    subtractAmount: (objectToSubtract) => dispatch(subtractAmount(objectToSubtract)),
    addProductToShoppingList: (part) => dispatch(addProductToShoppingList(part)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)