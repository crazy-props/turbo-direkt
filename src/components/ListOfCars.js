import React, {Component} from 'react'
import {connect} from "react-redux";
import _ from 'lodash';
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"
import TextField from 'material-ui/TextField';
import {Row, Col} from 'react-flexbox-grid';
class ListOfCars extends Component {
    state = {
        searchTerm: '',
    }
    render() {
        let cars = this.props.cars;
        cars = _.orderBy(cars, ['mark'], ['asc'])
        let filter = cars.filter(el => el.mark.toLowerCase().indexOf(this.state.searchTerm) !== -1||el.mark.indexOf(this.state.searchTerm) !== -1
        );
        return filter === null ?
            <Spinner/>
            : <div>
                <Row middle={'xs'} className={'partsSearchRow'}>
                    <Col xs={6}>
                        <Row end={'xs'}>
                            <Col xs={6}>
                                <TextField
                                    style={{margin: 'auto'}}
                                    fullWidth={true}
                                    id={'idForTextField'}
                                    floatingLabelText={'Search for cars or turbochargers'}
                                    type={"text"}
                                    value={this.state.searchTerm}
                                    onChange={(event => {
                                        this.setState({searchTerm: event.target.value})
                                    })}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={'partsTableDiv'}>
                    <table className="carsTable">
                        <thead className="carsTableHead">
                            <th>Mark</th>
                            <th>Model</th>
                            <th>Date</th>
                            <th>Capacity</th>
                            <th>No.</th>
                            <th>Power</th>
                            <th className="lastTh">Turbo OEM</th>
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
                                                    el={el}/></a>
                                                ) :
                                                el.turbo_OEM
                                            }
                                    </td>
                                </tr>
                        ):<Spinner/>
                        }
                        </tbody>
                    </table>
                </Row>
            </div>
    }
}
const mapStateToProps = state => ({
    cars: state.carsState.cars,
    turbo: state.turboState.turbo,
})
const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfCars)
