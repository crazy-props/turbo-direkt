import React, { Component } from 'react'
import spinner from "../../img/spinner.png"
import Container from '../UI/Container';

class Spinner extends Component {
    render() {
        return (
            <div className="spinerBackground">
                <Container>
                    <div className="spinner">
                        <img className="spinnerImage" src={spinner} />
                        <p className="loading2">Wczytuję dane ...</p>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Spinner;