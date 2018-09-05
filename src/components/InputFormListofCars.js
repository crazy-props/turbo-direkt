import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {addCarToList} from "../state/carsState";
import {connect} from "react-redux";
import {
    Step,
    Stepper,
    StepLabel
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {withStyles} from "@material-ui/core";
import SingleTurbine from "./SingleTurbine";
import CheckBoxes from "./CheckBoxes";
import TableTop from "./TableTop";
import AutoComplete from "material-ui/AutoComplete";
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const styles = {
    block: {
        maxWidth: 250,
    },
    step: {
        fontSize: "1.4vh",
    }
};
class HorizontalLinearStepper extends React.Component {
    state = {
        searchText: '',
        finished: false,
        stepIndex: 0,
        checked1: false,
        checked2: false,
        checked3: false,
        mark: "",
        model: "",
        date: "",
        capacity: "",
        factoryNo: "",
        power: "",
        turbo: [],
    };
    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,//turbo:this.state.turbo.concat([searchText])
        });
    };

    handleNewRequest = () => {
        this.setState({
            turbo:this.state.turbo.concat([this.state.searchText]),
            searchText: '',
        });
    };

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
    }
    cancelInput() {
        this.refs.fieldName.value = "";
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
            this.setState({date: "from " + e.target.value});
        else if (this.state.stepIndex === 3)
            this.setState({capacity: e.target.value + " ccm"});
        else if (this.state.stepIndex === 4)
            this.setState({factoryNo: e.target.value});
        else if (this.state.stepIndex === 5)
            this.setState({power: e.target.value + ' HP'});
        else if (this.state.stepIndex === 6)
            this.setState({
                turbo: [...this.state.turbo]});
    }
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Dodaj markę pojazdu (pole wymagane):';
            case 1:
                return 'Dodaj model (pole wymagane):';
            case 2:
                return 'Dodaj datę produkcji:';
            case 3:
                return 'Dodaj pojemność (pole wymagane):';
            case 4:
                return 'Dodaj oznaczenie fabryczne:';
            case 5:
                return 'Dodaj moc pojazdu:';
            case 6:
                return 'Dodaj numer turbiny (pole wymagane):';
            default:
                return 'Return';
        }
    }

    render() {
        const list = this.props.cars && this.props.cars.length ? this.props.cars.map(car => car.turbo_OEM).reduce((red, val) => red.concat(val), []).filter(function (a, b, c) {
            return c.indexOf(a) === b;
        }) : ['waitnig'];
        console.log(this.state.searchText)
        const objecttodb = {
            mark: this.state.mark, model: this.state.model, date: this.state.date, capacity: this.state.capacity,
            no: this.state.factoryNo, power: this.state.power, turbo_OEM: this.state.turbo
        }
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        return (
            this.state.checked1?
                <div>
                    <CheckBoxes
                    stepIndex={this.state.stepIndex}
                    checked1={this.state.checked1}
                    checked2={this.state.checked2}
                    checked3={this.state.checked3}
                    onCheck1={this.updateCheck1.bind(this)}
                    onCheck2={this.updateCheck2.bind(this)}
                    onCheck3={this.updateCheck3.bind(this)}
                    />
                   <Table/>
                    <TableTop/>
                    <TableBody>
                        <TableRow style={styles.row}>
                            <CustomTableCell component="th" scope="row">{this.state.mark}</CustomTableCell>
                            <CustomTableCell>{this.state.model}</CustomTableCell>
                            <CustomTableCell>{this.state.date}</CustomTableCell>
                            <CustomTableCell>{this.state.capacity}</CustomTableCell>
                            <CustomTableCell>{this.state.factoryNo}</CustomTableCell>
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
                                <StepLabel style={styles.step}>MARKA POJAZDU </StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>MODEL</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>DATA PRODUKCJI</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>POJEMNOŚĆ</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>FABRYCZNE</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>MOC</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel style={styles.step}>TURBO OEM</StepLabel>
                            </Step>
                        </Stepper>
                        <div style={contentStyle}>
                            {finished ? (
                                <p>
                                    <RaisedButton
                                        label="Wstecz"
                                        disabled={stepIndex === 0}
                                        style={{marginRight: 12}}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            this.setState({
                                                stepIndex: 0, finished: false, mark: '', model: '',
                                                capacity: '', date: "", factoryNo: "", power: "",
                                                turbo: []
                                            });
                                        }}
                                    />
                                    <RaisedButton
                                        disabled={stepIndex < 6}
                                        label={'Dodaj pojazd'}
                                        onClick={addCarToList(objecttodb)}
                                        style={{marginRight: 12}}
                                    />
                                </p>
                            ) : (
                                <div>
                                    <p>{this.getStepContent(stepIndex)}</p>
                                    <div style={{marginTop: 12}}>{stepIndex!==6?
                                        <input
                                            ref="fieldName"
                                            type={stepIndex === 3 || stepIndex === 5 ? "number" : "text"}
                                            onChange={this.handleForm}
                                        />:<AutoComplete
                                            ref="fieldName"
                                        floatingLabelText="Dodaj numer turbiny"
                                        filter={AutoComplete.fuzzyFilter}
                                        dataSource={list||['Coś nie działą w database']}
                                        maxSearchResults={8}
                                        onUpdateInput={this.handleUpdateInput}
                                        onNewRequest={()=>{this.handleNewRequest()}}
                                        />}
                                        <RaisedButton
                                            label="Wstecz"
                                            disabled={stepIndex === 0}
                                            onClick={() => {
                                                this.handlePrev();
                                                this.cancelInput()
                                            }}
                                            style={{marginRight: 12}}
                                        />
                                        <RaisedButton
                                            label={stepIndex === 7 ? 'Zakończ' : 'Dalej'}
                                            primary={true}
                                            disabled={(
                                                this.state.mark === ''
                                                || stepIndex === 1 && this.state.model === ""
                                                || stepIndex === 3 && this.state.capacity === ''
                                                || stepIndex === 6 && this.state.turbo.length === 0
                                            )
                                            }
                                            onClick={() => {
                                                this.handleNext();
                                                this.cancelInput()
                                            }}
                                            style={{marginRight: 12}}
                                        />
                                        <RaisedButton
                                            label="Anuluj"
                                            disabled={stepIndex === 0}
                                            style={{marginRight: 12}}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                this.setState({
                                                    stepIndex: 0, finished: false, mark: '', model: '',
                                                    capacity: '', date: "", factoryNo: "", power: "",
                                                    turbo: []
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <CheckBoxes
                        stepIndex={this.state.stepIndex}
                        checked1={this.state.checked1}
                        checked2={this.state.checked2}
                        checked3={this.state.checked3}
                        onCheck1={this.updateCheck1.bind(this)}
                        onCheck2={this.updateCheck2.bind(this)}
                        onCheck3={this.updateCheck3.bind(this)}
                    />
                </div>
        );
    }
}
const mapStateToProps = state => ({
    cars: state.carsState.cars,
})
const mapDispatchToProps = dispatch => ({
    addCarToList: (objecttodb) => dispatch(addCarToList(objecttodb))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HorizontalLinearStepper)
