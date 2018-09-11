import React, {Component} from 'react'
import {connect} from "react-redux";
import {addAmount, subtractAmount, searchParts, myInit} from '../../state/partsState';
import {addProductToShoppingList} from '../../state/shoppingList';
import AddPart from './AddPart'
import IconButton from 'material-ui/IconButton';
import {Row, Col} from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import Pagination from "material-ui-pagination";
import TR from './TR'
import Partsearch from './Partsearch'
import Backspace from 'material-ui/svg-icons/content/backspace';
import AddPartIcon from 'material-ui/svg-icons/image/add-to-photos'


class ListOfParts extends Component {
    state = {
        isDialogOpen: false,
        ITEMS_PER_PAGE: 10,
        currentPage: 0,

    }

    handleOpen() {
        this.setState({isDialogOpen: true})
    }

    handleClose() {
        this.setState({isDialogOpen: false})
    }

    compare(a, b) {
        if (a.part < b.part)
            return -1;
        if (a.part > b.part)
            return 1;
        return 0;
    }

    render() {

        let myArrayForState = ['actuator', 'back_plate', 'bearing_housing', 'compressor_wheel', 'gasket_kit', 'heat_shield', 'KODE_CHRA', 'nozzle', 'repair_kit', 'turbine_wheel']

        let arrayForHeadings = ['Actuator', 'Back plate', 'Bearing housing', 'Compressor wheel', 'Gasket kit', 'Heat shield', 'KODE CHRA', 'Nozzle', 'Repair kit', 'Turbine wheel'
        ]
        let parts = this.props.parts;
        const filter = parts
            .sort(this.compare)
            .filter(part => {
                    return (part.part.toLowerCase().includes(this.props.searchState.toLowerCase()))
                        || (part.group.toLowerCase().includes(this.props.searchState.toLowerCase()))
                }
            )

        const numberOfParts = filter && filter.length
        return (
            <div>
                <Row middle={'xs'} className={'partsSearchRow'}>
                    <Col xs={6}>
                        <Partsearch/>
                    </Col>
                    <Col xs={1}>
                        <IconButton tooltip="czyść filtr"
                                    onClick={() => this.props.searchParts('')}
                        >
                            <Backspace/>
                        </IconButton>
                    </Col>
                    <Col xs>
                        <IconButton
                            onClick={() => this.handleOpen()}
                            tooltip="dodaj nową część"
                        >
                            <AddPartIcon/>
                        </IconButton>

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
                                    key={Math.random()}
                                    partInStateArray={partInStateArray}
                                    index={index}
                                    myArrayForState={myArrayForState}
                                    arrayForHeadings={arrayForHeadings}
                                    addAmount={this.props.addAmount}
                                    subtractAmount={this.props.subtractAmount}
                                    addToShoppingList={this.props.addProductToShoppingList}
                                />
                            )
                            : 'szukam części...'
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
    searchState: state.partsState.search,
})

const mapDispatchToProps = dispatch => ({
    addAmount: (objectToAdd, groupOfObject) => dispatch(addAmount(objectToAdd, groupOfObject)),
    subtractAmount: (objectToSubtract, objectsGroup) => dispatch(subtractAmount(objectToSubtract, objectsGroup)),
    addProductToShoppingList: (part, group) => dispatch(addProductToShoppingList(part, group)),
    searchParts: (value) => dispatch(searchParts(value)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)
