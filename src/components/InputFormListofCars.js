import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {addCarToList} from "../state/carsState";
import {connect} from "react-redux";
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
    StepLabel
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {withStyles} from "@material-ui/core";
import SingleTurbine from "./SingleTurbine";
import {removeCarFromList} from "../state/carsState";





const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
/**
 * A basic vertical non-linear implementation
 */const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    step: {
        fontSize: "1.4vh",
    }
};

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class HorizontalLinearStepper extends React.Component {

    state = {
        finished: false,
        stepIndex: 0,
        checked1: false,
        checked2: false,
        checked3: false,
        mark: "",
        model: "",
        date: "",
        capacity: "",
        factoryno: "",
        power: "",
        turbo: []

    };


    updateCheck1() {
        this.setState((oldState) => {
            return {
                checked1: !oldState.checked,
                checked2: false,
                checked3: false
            };
        });
    }

    updateCheck2() {
        this.setState((oldState) => {
            return {
                checked1: false,
                checked2: !oldState.checked,
                checked3: false
            };
        });
    }

    updateCheck3() {
        this.setState((oldState) => {
            return {
                checked1: false,
                checked2: false,
                checked3: !oldState.checked
            };
        });
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 6,
        });
    };
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    handleForm = (e) => {
        if (this.state.stepIndex === 0)
            this.setState({mark: e.target.value});
        else if (this.state.stepIndex === 1)
            this.setState({model: e.target.value});
        else if (this.state.stepIndex === 2)
            this.setState({date: "from "+ e.target.value});
        else if (this.state.stepIndex === 3)
            this.setState({capacity: e.target.value+" ccm"});
        else if (this.state.stepIndex === 4)
            this.setState({factoryno: e.target.value});
        else if (this.state.stepIndex === 5)
            this.setState({power: e.target.value + ' HP'});
        else if (this.state.stepIndex === 6)
            this.setState({turbo: [...this.state.turbo, e.target.value]});
        console.log(this.state.mark);
        console.log(this.state.model);
        console.log(this.state.turbo);
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Type car mark';
            case 1:
                return 'Type car model';
            case 2:
                return 'Type model production date';
            case 3:
                return 'Type capacity';
            case 4:
                return 'Type factory No.';
            case 5:
                return 'Type horse power';
            case 6:
                return 'Type Turbo OEM';
            default:
                return 'Return';
        }
    }



    render() {
const objecttodb={
    mark: this.state.mark,
    model: this.state.model,
    date: this.state.date,
    capacity: this.state.capacity,
    no: this.state.factoryno,
    power: this.state.power,
    turbo_OEM: this.state.turbo

}
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            this.state.checked1 || this.state.checked2 || this.state.checked3 ?
                <div>
                    <Checkbox
                        label="Add new car"
                        checked={this.state.checked1}
                        onCheck={this.updateCheck1.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="Add new part"
                        checked={this.state.checked2}
                        onCheck={this.updateCheck2.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="Add new turbo"
                        checked={this.state.checked3}
                        onCheck={this.updateCheck3.bind(this)}
                        style={styles.checkbox}
                    /><Table/>
                    <TableHead>
                        <CustomTableCell>Mark</CustomTableCell>
                        <CustomTableCell>Model</CustomTableCell>
                        <CustomTableCell>Date</CustomTableCell>
                        <CustomTableCell>Capacity</CustomTableCell>
                        <CustomTableCell>No.</CustomTableCell>
                        <CustomTableCell>Power</CustomTableCell>
                        <CustomTableCell>Turbo OEM</CustomTableCell>
                    </TableHead>
                    <TableBody>
                        <TableRow style={styles.row}>
                            <CustomTableCell component="th" scope="row">{this.state.mark}</CustomTableCell>
                            <CustomTableCell>{this.state.model}</CustomTableCell>
                            <CustomTableCell>{this.state.date}</CustomTableCell>
                            <CustomTableCell>{this.state.capacity}</CustomTableCell>
                            <CustomTableCell>{this.state.factoryno}</CustomTableCell>
                            <CustomTableCell>{this.state.power}</CustomTableCell>
                            <CustomTableCell className="turboList">
                                {this.state.turbo && this.state.turbo.length ?
                                    this.state.turbo.filter(function (a, b, c) {
                                        return c.indexOf(a) === b;
                                    }).map(el => <SingleTurbine
                                        turbine={el}/>
                                    ) :
                                    this.state.turbo
                                }
                            </CustomTableCell>
                        </TableRow>
                    </TableBody>
                    <Table/>
                    <div style={{width: '80%', maxWidth: 500, margin: 'auto'}}>
                        <Stepper style={styles.step} activeStep={stepIndex}>
                            <Step style={styles.step}>
                                <StepLabel style={styles.step}>Type car mark </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>Type car model</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>Type model production date</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>Type capacity</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>Type factory No.</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>Type horse power</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>Type Turbo OEM</StepLabel>
                            </Step>
                        </Stepper>
                        <div style={contentStyle}>
                            {finished ? (
                                <p>
                                    <a
                                        href="#"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            this.setState({stepIndex: 0, finished: false});
                                        }}
                                    >
                                        Click here
                                    </a> to reset the example.
                                </p>
                            ) : (
                                <div>
                                    <p>{this.getStepContent(stepIndex)}</p>
                                    <div style={{marginTop: 12}}>
                                        <input
                                            onChange={this.handleForm}
                                        />

                                        <FlatButton
                                            label="Back"
                                            disabled={stepIndex === 0}
                                            onClick={this.handlePrev}
                                            style={{marginRight: 12}}
                                        />
                                        <RaisedButton
                                            label={stepIndex === 7 ? 'Finish' : 'Next'}
                                            primary={true}
                                            onClick={this.handleNext}
                                        />
                                        <button
                                            onClick={addCarToList(objecttodb)}
                                        >xxaDD</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <Checkbox
                        label="Add new car"
                        checked={this.state.checked1}
                        onCheck={this.updateCheck1.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="Add new part"
                        checked={this.state.checked2}
                        onCheck={this.updateCheck2.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="Add new turbo"
                        checked={this.state.checked3}
                        onCheck={this.updateCheck3.bind(this)}
                        style={styles.checkbox}
                    />
                </div>
        );
    }
}

const mapStateToProps = state => ({
    cars: state.carsState.cars,
})
const mapDispatchToProps = dispatch => ({
    addCarToList: (objecttodb) => dispatch(addCarToList(objecttodb))})

export default HorizontalLinearStepper;