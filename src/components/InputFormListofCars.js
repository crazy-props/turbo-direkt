import React, {Component} from 'react';


/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */
class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: "",
            model: "",
            dateFrom: null,
            dateTo: null,
            capacity: "",
            no: "",
            power: "",
            turbooem: ""
        }
    }

    handleForm = (e) => {
        this.setState({dateFrom: e.target.value});
    }
    handleDateTo = (e) => {
        this.setState({dateTo: e.target.value});
    }

    render() {
        return (

            <div>
                <form onSubmit={this.handleForm}>
                    <input type="text" hintText="Mark" />
                    <input type="text" hintText="Model"/>
                    <input type="date" hintText="Portrait Inline Dialog" container="inline"value={this.state.dateFrom}/>
                    <input type="date" hintText="Landscape Inline Dialog" container="inline" mode="landscape"/>
                    <input type="number" hintText="Capacity"/>
                    <input type="text" hintText="No."/>
                    <input type="number" hintText="Power"/>
                    <input type="text" hintText="Turbo Oem"/>
                </form>
                <button onClick={console.log(this.state.dateFrom)}>OK</button>
            </div>
        );
    }
}

export default InputForm;