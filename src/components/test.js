import React from 'react'
import {db} from '../firebase'
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"
import {Col, Row} from "react-flexbox-grid";
import TextField from "material-ui/TextField";

var equal="";
var content=[];
function fckSort() {
    var carsRef = db.ref("car_model");

    carsRef.orderByChild('mark').startAt(`${equal}`).limitToFirst(150).on('value', showData);

    function showData(items) {


        items.forEach(child=> {
            content.push(child.val())

        })
    }
}fckSort()

class Count extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: content,
            search:'',
            getDataAgain:false
        }
        this.updateSearch=this.updateSearch.bind(this)
        this.Search=this.Search.bind(this)


    }
    componentDidUpdate (state) {
        // only update chart if the data has changed
        if (this.state.getDataAgain===true) {
            content=[];
            equal = (this.state.search);
            fckSort();

        }

    }
    updateSearch(event){
        this.setState({search:event.target.value, getDataAgain:true
        });

    }
    Search(){
        this.forceUpdate()
    }

    render() {
        let filter=this.state.list.filter(el=>el.mark.toLowerCase().indexOf(this.state.search)!==-1||el.mark.indexOf(this.state.searchTerm) !== -1
    ||el.turbo_OEM.toString().indexOf(this.state.search)!==-1
        );
        return (
            <div style={{marginTop:"15vh"}}>
                <Row middle={'xs'} className={'partsSearchRow2'}>
                    <Col xs={6}>
                        <Row end={'xs'}>
                            <Col xs={6}>
                                <TextField
                                    style={{margin: 'auto'}}
                                    fullWidth={true}
                                    id={'idForTextField'}
                                    floatingLabelText={'Search for cars or turbochargers'}
                                    type={"text"}
                                    value={this.state.search}
                                    onChange={(event => {
                                        this.setState({search: event.target.value})
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
        )
    }
}

export default Count;