import React, {Component} from 'react'
import {connect} from "react-redux";
import _ from 'lodash';
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"
import Pagination from 'material-ui-pagination'
import {Row, Col} from 'react-flexbox-grid';
import Error from "./Error";

class ListOfCars extends Component {

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
                    <table className="carsTable">
                        <thead className="carsTableHead">
                        <td>Mark</td>
                        <td>Model</td>
                        <td>Date</td>
                        <td>Capacity</td>
                        <td>No.</td>
                        <td>Power</td>
                        <td className="lastTh">Turbo OEM</td>
                        </thead>
                        <tbody key={Math.random()}>
                        {
                            filter && filter.length ? filter
                            .filter((el, i) => (
                                i >= this.state.ITEMS_PER_PAGE * this.state.currentPage
                                &&
                                i < this.state.ITEMS_PER_PAGE * (this.state.currentPage + 1)
                            ))
                            .map((el) =>
                                <tr className="trOne">
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
                                            }).map(el => <SingleTurbine
                                                turbine={el}/>                                        ) :
                                            el.turbo_OEM
                                        }
                                    </td>
                                </tr>
                            ) : this.state.searchTerm.length?<Error/>:<Spinner/>
                        }
                        </tbody>
                    </table>
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
)(ListOfCars)