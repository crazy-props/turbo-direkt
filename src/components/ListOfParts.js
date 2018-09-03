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
import TR from './TR'

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

    setStateForSearch(event) {
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
                                <TR
                                    partInStateArray={partInStateArray}
                                    index={index}
                                    myArrayForState={myArrayForState}
                                    arrayForHeadings={arrayForHeadings}
                                />
                            )
                            : 'loading'
                        }
                        </tbody>

                    </table>
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