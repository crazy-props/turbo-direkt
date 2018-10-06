import React, { Component } from 'react'
import { connect } from "react-redux";
import _ from 'lodash';
import SingleTurbine from "./SingleTurbine";
import Spinner from "../Utils/Spinner"
import Pagination from 'material-ui-pagination'
import { Row, Col } from 'react-flexbox-grid';
import Error from "../Utils/Error";
import { removeCarFromList } from "../../state/carsState";
import TableTop from "./TableTop";
import IconButton from "material-ui/IconButton";
import Delete from "material-ui/svg-icons/action/delete";
import DeleteDialog from '../Utils/DeleteDialog'
import {Snackbar} from "material-ui";
import Container from '../UI/Container';
import style from '../UI/styleUi'
import {clearError} from "../../state/alerts";

class ListOfCars extends Component {
    state = {
        searchTerm: '',
        ITEMS_PER_PAGE: 10,
        currentPage: 0,
        open: false,
        dialogValue: false,
    };

    handleOpen = (car) => {
        this.setState({ open: true, dialogValue: car});
    };
    handleDialogClose = () => {
        this.setState({ open: false })

    };
    debounceEvent(...args) {
        this.debouncedEvent = _.debounce(...args);
        return e => {
            e.persist();
            return this.debouncedEvent(e);
        };
    }
    handleDialogDelete = (el) => { this.handleDialogClose(); this.props.removeCarFromList(el); };
    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value, currentPage: 0 });
    };
    componentWillUnmount() {
        this.debouncedEvent.cancel();
    }
    render() {
        let cars = this.props.cars;
        cars = _.orderBy(cars, ['mark'], ['asc'])
        const filter = cars
            .filter(car =>
                (car.mark.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1) ||
                (car.turbo_OEM && car.turbo_OEM.find(turbo => turbo.toString().indexOf(this.state.searchTerm.toUpperCase()) !== -1))
                || (car.model.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1)
            )

        const numberOfCars = filter && filter.length

        return (filter === null ?
            <Spinner />
            : <div>
                <Container>
                    <Row middle={'xs'}>
                        <Col>
                            <Row>
                                <Col>
                                    <div className="group2">
                                        <input placeholder="Szukaj:pojazd,marka,turbina" type="search"
                                            onChange={this.debounceEvent(this.handleSearch, 700)} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className={'partsTableDiv'}>
                        <table className="carsTable">
                            <TableTop />
                            <tbody key={Math.random()}>
                                {
                                    filter && filter.length ? filter
                                        .filter((el, i) => (
                                            i >= this.state.ITEMS_PER_PAGE * this.state.currentPage
                                            &&
                                            i < this.state.ITEMS_PER_PAGE * (this.state.currentPage + 1)
                                        ))
                                        .map((el) =>
                                            <tr className="trOne" key={el.key}>
                                                <td>{el.mark}</td>
                                                <td>{el.model}</td>
                                                <td>{el.date}</td>
                                                <td>{el.capacity}</td>
                                                <td>{el.no}</td>
                                                <td>{el.power}</td>
                                                <td className="turboList">
                                                    {el.turbo_OEM && el.turbo_OEM.length ?
                                                        el.turbo_OEM.filter(function (a, b, c) {
                                                            return c.indexOf(a) === b;
                                                        }).map(el => <SingleTurbine key={el}
                                                            turbine={el} />) :
                                                        el.turbo_OEM}
                                                </td>
                                                <td>
                                                    <IconButton key={el}
                                                        tooltip="Usuń"
                                                        onClick={() => this.handleOpen(el)}
                                                        iconStyle={style.iconButton}

                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </td>
                                            </tr>
                                        ) : <tr><td>{this.state.searchTerm.length ? <Error /> : <Spinner />}</td></tr>
                                }
                            </tbody>
                        </table>
                    </Row>
                    <div style={{ textAlign: 'center' }}>
                        <Pagination
                            total={Math.ceil(numberOfCars / this.state.ITEMS_PER_PAGE)}
                            current={this.state.currentPage + 1}
                            display={10}
                            onChange={newPage => this.setState({ currentPage: newPage - 1 })}
                        />
                    </div>
                </Container>
                <DeleteDialog
                    title={`Czy na pewno chcesz usunąć samochód ${this.state.dialogValue ? this.state.dialogValue.mark : ''} z listy?`}
                    stateDialog={this.state.open}
                    handleClose={this.handleDialogClose}
                    /*dispatched function has own reference to turbine.key property*/
                    handleDelete={() => {
                        this.handleDialogDelete(this.state.dialogValue);
                    }}
                    carName={this.state.dialogValue ? this.state.dialogValue.turboOEM : ''}
                />
                <Snackbar
                    autoHideDuration={4000}
                    open={this.props.imWithAlert}
                    message={this.props.alert}
                    bodyStyle={{textAlign: 'center'}}
                    onRequestClose={this.props.clearError}
                />
            </div>)
    }
}
const mapStateToProps = state => ({
    cars: state.carsState.cars,
    imWithAlert: state.alerts.imWithAlert,
    alert: state.alerts.alert,
});
const mapDispatchToProps = dispatch => ({
    removeCarFromList: (el) => dispatch(removeCarFromList(el)),
    clearError: () => dispatch(clearError())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfCars)