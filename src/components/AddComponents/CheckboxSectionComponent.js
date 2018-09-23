import React from 'react';
import {connect} from "react-redux";
import CheckBoxes from "../Common/CheckBoxes";
import AddCarInputsAndButtons from "./AddCarInputsAndButtons";
import AddPart from './AddPart'


class CheckboxSectionComponent extends React.Component {
    state = {
        finished: false,
        stepIndex: 0,
        checked1: false,
        checked2: false,
        checked3: false,
    };

    removeTurbo = (name) => {
        this.setState({turbo: this.state.turbo.filter(el => el !== name)});
    }

    updateCheck1() {
        this.setState((oldState) => {
            return {
                checked1: !oldState.checked, checked2: false, checked3: false
            };
        });
    }

    updateCheck2() {
        this.setState((oldState) => {
            return {
                checked1: false, checked2: !oldState.checked, checked3: false
            };
        });
    }

    updateCheck3() {
        this.setState((oldState) => {
            return {
                checked1: false, checked2: false, checked3: !oldState.checked
            };
        });
    };
    showCheckboxes = () => {
        return <CheckBoxes
            stepIndex={this.state.stepIndex}
            checked1={this.state.checked1}
            checked2={this.state.checked2}
            checked3={this.state.checked3}
            onCheck1={this.updateCheck1.bind(this)}
            onCheck2={this.updateCheck2.bind(this)}
            onCheck3={this.updateCheck3.bind(this)}
        />
    }

    render() {
        return (
            this.state.checked1 ?
                <div>
                    {this.showCheckboxes()}
                    <AddCarInputsAndButtons
                    stepIndex={this.state.stepIndex}/>
                </div>
                : this.state.checked2 ?
                <div>
                    {this.showCheckboxes()}
                    <AddPart/>
                </div>

                :
                <div>
                    {this.showCheckboxes()}
                </div>
        );
    }
}

const mapStateToProps = state => ({
    cars: state.carsState.cars,
    turbines: state.turboState.turbo
})

export default connect(
    mapStateToProps
)(CheckboxSectionComponent)

