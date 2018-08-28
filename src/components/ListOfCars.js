import React, { Component } from 'react'
import { connect } from "react-redux";
import _ from 'lodash';
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"
import TextField from 'material-ui/TextField';
import { Row, Col } from 'react-flexbox-grid';
class ListOfCars extends Component {
    state = {
        searchTerm: '',
    }

    render() {
        let cars = this.props.cars;
        cars = _.orderBy(cars, ['mark'], ['asc'])
        const filter = cars
            .filter(car =>
                car.mark.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1 ||
                // car.turbo_OEM && <- only because yoou have inconsistent data in database!
                car.turbo_OEM && car.turbo_OEM.find(turbo => turbo.toString().indexOf(this.state.searchTerm) !== -1)
            )


        return filter === null ?
            <Spinner />
            : <div>
                <Row middle={'xs'} className={'partsSearchRow'}>
                    <Col xs={6}>
                        <Row end={'xs'}>
                            <Col xs={6}>
                                <TextField
                                    style={{ margin: 'auto', fontSize: "12px" }}
                                    fullWidth={true}
                                    id={'idForTextField'}
                                    floatingLabelText={'Search for cars or turbochargers'}
                                    type={"text"}
                                    value={this.state.searchTerm}
                                    onChange={(event => {
                                        this.setState({ searchTerm: event.target.value })
                                    })}
                                />
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
                        {filter && filter.length ? filter.map((el) =>
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
                                        }).map(el => <a
                                            href="http://localhost:3000/turbines"><SingleTurbine
                                            el={el} /></a>
                                        ) :
                                        el.turbo_OEM
                                    }
                                </td>
                            </tr>
                        ) : <Spinner />
                        }
                        </tbody>
                    </table>
                </Row>
            </div>
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