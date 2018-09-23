import React from 'react';
import {addCarToList} from "../../state/carsState";
import {connect} from "react-redux";
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import AddCarOutcomeTable from "./AddCarOutcomeTable";
import AddCarInputs from './AddCarInputs'

const styles = {
    block: {maxWidth: 250,}, step: {fontSize: "1.4vh"}, chip: {margin: '4'}
}

class AddCarInputsAndButtons extends React.Component {
    state = {
        stepper: ["MARKA", "MODEL", "DATA PRODUKCJI", "POJEMNOŚĆ", "OZN.FABRYCZNE", "MOC", "TURBO OEM"],
        searchText: '',
        finished: false,
        stepIndex: 0,
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

    componentDidMount() {
        this.setState({list: this.props.turbines.map(el => el.turboOEM).sort()})
        this.setState({marks: this.props.cars.map(el => el.mark).sort()})
    }

    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
        console.log(searchText)
    };
    handleNewRequest = () => {
        if (this.props.turbines.filter(el => el.turboOEM === this.state.searchText).length > 0) {
            this.setState({
                turbo: this.state.turbo.concat([this.state.searchText]),

            });
        }
    };
    handleMarkRequest = () => {
        this.setState({
            mark: this.state.searchText
        });
    };
    removeTurbo = (name) => {
        this.setState({turbo: this.state.turbo.filter(el => el !== name)});
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
    setFromPropsToState = (incomingProps) => {
        this.setState(incomingProps)
    }

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
            <div style={{width: '80%', maxWidth: 500, margin: 'auto'}}>
                <Stepper style={styles.step} activeStep={stepIndex}>
                    {this.state.stepper.map(el => <Step key={el}><StepLabel>{el}</StepLabel></Step>)}
                </Stepper>
                <AddCarOutcomeTable
                    mark={this.state.mark}
                    model={this.state.model}
                    date={this.state.date}
                    capacity={this.state.capacity}
                    factoryNo={this.state.factoryNo}
                    power={this.state.power}
                    turbo={this.state.turbo}
                    removeTurbo={this.removeTurbo}
                />
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
                            <AddCarInputs
                                stater={this.state}
                                handleUpdateInput={this.handleUpdateInput}
                                handleMarkRequest={this.handleMarkRequest}
                                handlePrev={this.handlePrev}
                                handleNext={this.handleNext}
                                handleNewRequest={this.handleNewRequest}
                                setFromPropsToState={this.setFromPropsToState}
                            />

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
                                        stepIndex === 0 ? (this.handleMarkRequest(), this.handleNext(stepIndex))
                                            : ((stepIndex === 6) && (this.state.turbo.length < 1)) ? alert('dodajTurbinę')
                                            : this.handleNext(stepIndex);
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
        );
    }
}

const mapStateToProps = state => ({
    cars: state.carsState.cars,
    turbines: state.turboState.turbo
})

export default connect(
    mapStateToProps
)(AddCarInputsAndButtons)

