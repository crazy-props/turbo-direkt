import React from 'react';
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
import CheckBoxes from "./CheckBoxes";
import TableTop from "./TableTop";
import AutoComplete from "material-ui/AutoComplete";
import Chip from 'material-ui/Chip';
import {Row} from "react-flexbox-grid";

const CustomTableCell = withStyles(theme => ({
    head: {backgroundColor: theme.palette.common.black, color: theme.palette.common.white,},
    body: {fontSize: 14,},
}))(TableCell);
const styles = {
    block: {maxWidth: 250,}, step: {fontSize: "1.4vh",}, chip: {margin: 4,},
}

class HorizontalLinearStepper extends React.Component {
    state = {
        stepper: ["MARKA", "MODEL", "DATA PRODUKCJI", "POJEMNOŚĆ", "OZN.FABRYCZNE", "MOC", "TURBO OEM"],
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
        list: [],
        marks: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.turbines) {
            this.setState({list: nextProps.turbines.map(el => el.turboOEM).sort()})
        }
        if (nextProps.cars) {
            this.setState({marks: nextProps.cars.map(el => el.mark).sort()})
        }
    }

    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    };
    handleNewRequest = () => {
        if (this.props.turbines.filter(el => el.turboOEM === this.state.searchText).length > 0) {
            this.setState({
                turbo: this.state.turbo.concat([this.state.searchText]),

            });
        }
        console.log(this.state)
    };
    handleMarkRequest = () => {
        this.setState({
            mark: this.state.searchText,

        });
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
    }

    handleNext = (currentStepIndex) => {
        const {stepIndex} = this.state;

        if (currentStepIndex < 6) {
            const inputsForNoDisplay = document.getElementsByClassName('step')
            inputsForNoDisplay.item(currentStepIndex + 1).style.display = 'block'
            inputsForNoDisplay.item(currentStepIndex).style.display = 'none'
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 6,
            })
        } else {
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 6,
            })
        }
    };
    handlePrev = (currentStepIndex) => {
        const inputsForNoDisplay = document.getElementsByClassName('step')
        inputsForNoDisplay.item(currentStepIndex - 1).style.display = 'block'
        inputsForNoDisplay.item(currentStepIndex).style.display = 'none'
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    render() {
        const objecttodb = {
            mark: this.state.mark, model: this.state.model, date: this.state.date, capacity: this.state.capacity,
            no: this.state.factoryNo, power: this.state.power, turbo_OEM: this.state.turbo
        }
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        const getStepContent = [
            'Dodaj markę pojazdu (pole wymagane):',
            'Dodaj model (pole wymagane):',
            'Dodaj datę produkcji:',
            'Dodaj pojemność (pole wymagane):',
            'Dodaj oznaczenie fabryczne:',
            'Dodaj moc pojazdu:',
            'Dodaj numer turbiny (pole wymagane):'
        ]
        return (
            this.state.checked1 ?
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
                    <Row className={'partsTableDiv'}>
                        <table className="carsTable">
                            <TableTop/>
                            <TableBody key={Math.random()}>
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
                                            }).map(el =>
                                                <Chip
                                                    key={el}
                                                    onRequestDelete={() => {
                                                        this.removeTurbo(el)
                                                    }}
                                                    style={styles.chip}
                                                >
                                                    {el}
                                                </Chip>
                                            ) :
                                            this.state.turbo
                                        }
                                    </CustomTableCell>
                                </TableRow>
                            </TableBody>
                        </table>
                    </Row>
                    <div style={{width: '80%', maxWidth: 500, margin: 'auto'}}>
                        <Stepper style={styles.step} activeStep={stepIndex}>
                            {this.state.stepper.map(el => <Step key={el}><StepLabel>{el}</StepLabel></Step>)}
                        </Stepper>
                        <div style={contentStyle}>
                            {finished ? (
                                <section>
                                    <RaisedButton
                                        label="Anuluj"
                                        disabled={stepIndex === 0}
                                        style={{marginRight: 12}}
                                        onClick={() => {

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
                                </section>
                            ) : (
                                <div>
                                    <div>{getStepContent[stepIndex]}</div>
                                    <div className={'step'}
                                         style={{display: 'block'}}
                                    >
                                        <AutoComplete
                                            floatingLabelText={"Szukaj"}
                                            filter={AutoComplete.caseInsensitiveFilter}
                                            menuStyle={styles.step}
                                            type={"search"}
                                            dataSource={this.state.marks || ['Problem ze strukturą danych.']}
                                            maxSearchResults={1}
                                            onUpdateInput={this.handleUpdateInput}
                                            onNewRequest={
                                                this.handleMarkRequest
                                            }
                                        />
                                    </div>
                                    <input
                                        className={'step'}
                                        value={this.state.model}
                                        onChange={(ev) => this.setState({model: ev.target.value})}
                                    />
                                    <input
                                        className={'step'}
                                        value={this.state.date}
                                        onChange={(ev) => this.setState({date: ev.target.value})}
                                    />
                                    <input
                                        className={'step'}
                                        value={this.state.capacity}
                                        onChange={(ev) => this.setState({capacity: ev.target.value})}
                                    />
                                    <input
                                        className={'step'}
                                        value={this.state.factoryNo}
                                        onChange={(ev) => this.setState({factoryNo: ev.target.value})}
                                    />
                                    <input
                                        className={'step'}
                                        value={this.state.power}
                                        onChange={(ev) => this.setState({power: ev.target.value})}
                                    />
                                    <div className={'step'}>
                                        <AutoComplete
                                            floatingLabelText={"Szukaj"}
                                            filter={AutoComplete.caseInsensitiveFilter}
                                            menuStyle={styles.step}
                                            type={"search"}
                                            dataSource={this.state.list || ['Problem ze strukturą danych.']}
                                            maxSearchResults={6}
                                            onUpdateInput={this.handleUpdateInput}
                                            onNewRequest={
                                                this.handleNewRequest
                                            }
                                        />
                                    </div>
                                    <section>
                                        <RaisedButton
                                            label="Wstecz" disabled={stepIndex === 0}
                                            onClick={() => {
                                                this.handlePrev(stepIndex);
                                            }}
                                            style={{marginRight: 12}}
                                        />
                                        <RaisedButton
                                            label={stepIndex === 7 ? 'Zakończ' : 'Dalej'}
                                            primary={true}
                                            onClick={() => {
                                                this.handleNext(stepIndex);
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
                                                    capacity: '', date: "", factoryNo: "", power: "", turbo: []
                                                });
                                                const inputsForNoDisplay = Array.from(document.getElementsByClassName('step'))
                                                inputsForNoDisplay.map((el, i) => i > 0 ? el.style.display = 'none' : el.style.display = 'block')
                                            }}
                                        />
                                    </section>
                                    <br/>
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
    turbines: state.turboState.turbo
})

export default connect(
    mapStateToProps
)(HorizontalLinearStepper)
