import React from 'react'
import {db} from '../firebase'
import SingleTurbine from "./SingleTurbine";
import Spinner from "./spinner"

var content = [];

class Count extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: content,
            search: '',
        }
        this.updateSearch = this.updateSearch.bind(this)
    }

    loadContent = () => {
        db.ref("car_model")
            .orderByChild('mark').on('value', showData);
        function showData(items) {
            items.forEach(child => {
                content.push(child.val())
            })
        }
    }

    componentWillMount() {
        this.loadContent()

    }

    updateSearch(event) {
        this.setState({
            search: event.target.value, getDataAgain: true
        });

    }

    render() {
        let filter = this.state.list.filter(el => el.mark.toLowerCase().indexOf(this.state.search) !== -1
            || el.turbo_OEM.toString().indexOf(this.state.search) !== -1
        );
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th className="filterable-cell">Mark</th>
                    <th className="filterable-cell">Model</th>
                    <th className="filterable-cell">Date</th>
                    <th className="filterable-cell">Capacity</th>
                    <th className="filterable-cell">No.</th>
                    <th className="filterable-cell">Power</th>
                    <th className="filterable-cell">Turbo OEM</th>
                </tr>
                <input type='text' onChange={this.updateSearch} value={this.state.search}/>
                </thead>
                <tbody>
                {filter.length?filter.map((el) =>
                    <tr>
                        <td>{el.mark}</td>
                        <td>{el.model}</td>
                        <td>{el.date}</td>
                        <td>{el.capacity}</td>
                        <td>{el.no}</td>
                        <td>{el.power}</td>
                        <td>
                            <tr>
                                {el.turbo_OEM && el.turbo_OEM.length ?
                                    el.turbo_OEM.filter(function (a, b, c) {
                                        return c.indexOf(a) === b;
                                    }).map(el => <a href="http://localhost:3000/turbines"><SingleTurbine
                                        el={el}/></a>
                                    ) :
                                    el.turbo_OEM
                                } </tr>
                        </td>
                    </tr>
                ):<Spinner/>
                }
                </tbody>
            </table>
        )
    }
}
export default Count;