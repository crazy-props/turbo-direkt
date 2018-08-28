import React, {Component} from 'react';
import spinner from "../img/spinner.png";
import logo from "../img/logo.png";


class Spinner extends Component {
    render() {
        return (
            <div className="spinnercontainer">
                <div className="spinner"><img className="spinnerImage" src={spinner}/></div>
                <br/>
                <p className="loading">Loading...</p>
            </div>
        );
    }
}

export default Spinner;