import React, {Component} from 'react'
import {connect} from "react-redux";
import {
    searchParts,
    deletePart
} from '../../state/partsState';
import {Row} from 'react-flexbox-grid';
import Pagination from "material-ui-pagination";
import DeleteDialog from '../Turbines/DeleteDialog'
import TR from './TR';
import Partsearch from './PartSearch';
import Spinner from '../Utils/Spinner'
import Container from "../UI/Container";
import {Snackbar} from "material-ui";
import {clearError} from "../../state/alerts";


class ListOfParts extends Component {
    state = {
        isDialogOpen: false,
        ITEMS_PER_PAGE: 10,
        currentPage: 0,
        currentDialogElem: '',
        dialogOpen: false

    }

    compare(a, b) {
        if (a.part < b.part)
            return -1;
        if (a.part > b.part)
            return 1;
        return 0;
    }

    handleDialogOpen = (part) => {
        this.setState({dialogOpen: true, currentDialogElem: part})
    }

    handleDialogClose = () => this.setState({dialogOpen: false})

    handleDialogDelete = (el) => {
        this.handleDialogClose();
        this.props.deletePart(el)
    }

    setFirstPageToState = () => {
        this.setState({currentPage: 0})
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
                <Container>
                    <Partsearch
                        setFirstPageToState={this.setFirstPageToState}
                    />
                </Container>
                <Container>
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
                                        deletePart={this.props.deletePart}
                                        handleDialogOpen={this.handleDialogOpen}
                                        handleDialogClose={this.handleDialogClose}
                                        handleDialogDelete={this.handleDialogDelete}
                                    />
                                )
                                : <Spinner/>
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
                </Container>
                <DeleteDialog
                    title={`Czy na pewno chcesz usunąć część ${this.state.currentDialogElem ? this.state.currentDialogElem.part : ''} z listy?`}
                    stateDialog={this.state.dialogOpen}
                    handleClose={this.handleDialogClose}
                    handleDelete={() => this.handleDialogDelete(this.state.currentDialogElem)}
                    turbineName={this.state.currentDialogElem ? this.state.currentDialogElem.part : ''}
                />
                <Snackbar
                    autoHideDuration={4000}
                    open={this.props.imWithAlert}
                    message={this.props.alert}
                    bodyStyle={{textAlign: 'center'}}
                    onRequestClose={this.props.clearError}
                />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts,
    products: state.shoppingListState.products,
    searchState: state.partsState.search,
    alert: state.alerts.alert,
    imWithAlert: state.alerts.imWithAlert
})

const mapDispatchToProps = dispatch => ({
    searchParts: (value) => dispatch(searchParts(value)),
    deletePart: (partKey, partName) => dispatch(deletePart(partKey, partName)),
    clearError: () => dispatch(clearError())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)