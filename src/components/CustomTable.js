import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {connect} from "react-redux";
import _ from 'lodash';
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"
import Pagination from 'material-ui-pagination'
import {Row, Col} from 'react-flexbox-grid';
import Error from "./Error";


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = ({
    root: {
        width: '100%',
        marginTop: "40px",
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: "gray",
        },
    },
});



class ListOfCarso extends Component {

    state = {
        searchTerm: '',
        ITEMS_PER_PAGE: 10,
        currentPage: 0

    }

    debounceEvent(...args) {
        this.debouncedEvent = _.debounce(...args);
        return e => {
            e.persist();
            return this.debouncedEvent(e);
        };
    }

    handleSearch = (e) => {
        this.setState({searchTerm: e.target.value,currentPage:0});
    }

    componentWillUnmount() {
        this.debouncedEvent.cancel();
    }

    render() {
        let cars = this.props.cars;
        cars = _.orderBy(cars, ['mark'], ['asc'])
        const filter = cars
            .filter(car =>
                car.mark.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1 ||
                car.turbo_OEM && car.turbo_OEM.find(turbo => turbo.toString().indexOf(this.state.searchTerm) !== -1)
            )

        const numberOfCars = filter && filter.length

        return (filter === null ?
            <Spinner/>
            : <div>
                <Row middle={'xs'} className={'partsSearchRow'}>
                    <Col xs={6}>
                        <Row end={'xs'}>
                            <Col xs={6}>
                                <div className="group">
                                    <input placeholder="search:turbo and cars" type="search"
                                           onChange={this.debounceEvent(this.handleSearch, 700)}/>
                                    <span className="highlight"/>
                                    <span className="bar"/>

                                </div>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={'partsTableDiv'}>
                    <Table style={styles.table}>
                        <TableHead>
                        <CustomTableCell>Mark</CustomTableCell>
                        <CustomTableCell>Model</CustomTableCell>
                        <CustomTableCell>Date</CustomTableCell>
                        <CustomTableCell>Capacity</CustomTableCell>
                        <CustomTableCell>No.</CustomTableCell>
                        <CustomTableCell>Power</CustomTableCell>
                        <CustomTableCell>Turbo OEM</CustomTableCell>
                        </TableHead>
                        <TableBody>
                        {
                            filter && filter.length ? filter
                                .filter((el, i) => (
                                    i >= this.state.ITEMS_PER_PAGE * this.state.currentPage
                                    &&
                                    i < this.state.ITEMS_PER_PAGE * (this.state.currentPage + 1)
                                ))
                                .map((el) =>
                                    <TableRow style={styles.row}>
                                        <CustomTableCell component="th" scope="row">{el.mark}</CustomTableCell>
                                        <CustomTableCell>{el.model}</CustomTableCell>
                                        <CustomTableCell>{el.date}</CustomTableCell>
                                        <CustomTableCell>{el.capacity}</CustomTableCell>
                                        <CustomTableCell>{el.no}</CustomTableCell>
                                        <CustomTableCell>{el.power}</CustomTableCell>
                                        <CustomTableCell className="turboList">
                                            {el.turbo_OEM && el.turbo_OEM.length ?
                                                el.turbo_OEM.filter(function (a, b, c) {
                                                    return c.indexOf(a) === b;
                                                }).map(el => <a
                                                    href="http://localhost:3000/turbines"><SingleTurbine
                                                    el={el}/></a>
                                                ) :
                                                el.turbo_OEM
                                            }
                                        </CustomTableCell>
                                    </TableRow>
                                ) : this.state.searchTerm.length?<Error/>:<Spinner/>
                        }
                        </TableBody>
                    </Table>
                </Row>
                <div style={{textAlign: 'center'}}>
                    <Pagination
                        total={Math.ceil(numberOfCars / this.state.ITEMS_PER_PAGE)}
                        current={this.state.currentPage + 1}
                        display={10}
                        onChange={newPage => this.setState({currentPage: newPage - 1})}
                    />
                </div>
            </div>)
    }
}

const mapStateToProps = state => ({
    cars: state.carsState.cars,
})
const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfCarso)