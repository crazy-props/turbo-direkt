import React, {Component} from 'react';
import spinner from "../img/spinner.png";

class Spinner extends Component {
    render() {
        return (
            <div className="spinnercontainer">
                <div className="spinner"><img className="spinnerImage" src={spinner}/></div>
                <div className="loading2">Loading...</div>
            </div>
        );
    }
}
export default Spinner;