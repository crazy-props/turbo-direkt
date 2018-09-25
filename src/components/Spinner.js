import React, { Component } from 'react'
import spinner from "../img/spinner.png"

class Spinner extends Component {
    render() {
        return (
            <div className="spinnercontainer">
                <div className="spinner"><img className="spinnerImage" src={spinner} /></div>
                <br />
                <p className="loading">Loading<p className="loading2">...</p></p>
            </div>
        );
    }
}

export default Spinner;