import React from 'react';
import {connect} from "react-redux";
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import AddPartInputs from './AddPartInputs'
import {newPart} from '../../state/partsState'

const styles = {
    block: {maxWidth: 250,}, step: {fontSize: "1.4vh"}, chip: {margin: '4'}
}

const myArrayForState = ['actuator', 'back_plate', 'bearing_housing', 'compressor_wheel', 'gasket_kit', 'heat_shield', 'KODE_CHRA', 'nozzle', 'repair_kit', 'turbine_wheel', 'inne']
const arrayForHeadings = ['Actuator', 'Back plate', 'Bearing housing', 'Compressor wheel', 'Gasket kit', 'Heat shield', 'KODE CHRA', 'Nozzle', 'Repair kit', 'Turbine wheel', 'Inne']

class AddPart extends React.Component {
    state = {
        stepper: ['GRUPA', 'CZĘŚĆ', "POTWIERDZENIE"],
        searchTextGroup: '',
        searchTextPart: '',
        finished: false,
        stepIndex: 0,
        group: '',
        part: '',
        groups: []
    };

    componentDidMount() {
        this.setState({groups: arrayForHeadings})
        this.setState({parts: this.props.parts.map(el => el.part)})
    }

    handleUpdateGroupInput = (searchText) => {
        this.setState({
            searchTextGroup: searchText,
        });
    };
    handleUpdatePartInput = (searchText) => {
        this.setState({
            searchTextPart: searchText,
        });
    };
    handleGroupRequest = () => {
        this.setState({
            group: this.state.searchTextGroup
        });
    };
    handlePartRequest = () => {
        this.setState({
            part: this.state.searchTextPart
        });
    };


    handleNext = (currentStepIndex) => {
        const {stepIndex} = this.state;
        if (currentStepIndex < 2) {
            const inputsForNoDisplay = document.getElementsByClassName('step')
            inputsForNoDisplay.item(currentStepIndex + 1).style.display = 'block'
            inputsForNoDisplay.item(currentStepIndex).style.display = 'none'
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            })
        } else {
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
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
    setFromPropsToState = (propsFromAddPartInputs) => {
        this.setState(propsFromAddPartInputs)
    }

    sendObjectToDb = () => {
        if (this.props.parts.find(element => element.part.toLowerCase() === this.state.part.toLowerCase())) {
            alert('this part already exists in the system')
        }
        else {
            const indexOfWrittenPart = arrayForHeadings.indexOf(this.state.group)
            indexOfWrittenPart !== -1 ? this.props.newPart(this.state.part, myArrayForState[indexOfWrittenPart]) :
                this.props.newPart(this.state.part, this.state.group)
        }
    }

    render() {


        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        const getStepContent = [
            'Wybierz grupę części: ',
            'Wpisz nazwę częsci: ',
            "Potwierdź"
        ]
        return (
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
                                        stepIndex: 0, finished: false, group: '', part: ''
                                    });
                                }}
                            />
                            <RaisedButton
                                disabled={stepIndex < 2}
                                label={'Dodaj część'}
                                onClick={this.sendObjectToDb}
                                style={{marginRight: 12}}
                            />
                        </section>
                    ) : (
                        <div>
                            <div>{getStepContent[stepIndex]}</div>
                            <AddPartInputs
                                stater={this.state}
                                handleUpdateGroupInput={this.handleUpdateGroupInput}
                                handleUpdatePartInput={this.handleUpdatePartInput}
                                handlePrev={this.handlePrev}
                                handleNext={this.handleNext}
                                handleGroupRequest={this.handleGroupRequest}
                                handlePartRequest={this.handlePartRequest}
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
                                    label={stepIndex === 3 ? 'Zakończ' : 'Dalej'}
                                    primary={true}
                                    onClick={() => {
                                        stepIndex === 0 ? (this.handleGroupRequest(), this.handleNext(stepIndex))
                                            : stepIndex === 1 ? (this.handlePartRequest(), this.handleNext(stepIndex))
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
                                            stepIndex: 0, finished: false, group: '', part: ''
                                        });
                                        const inputsForNoDisplay = Array.from(document.getElementsByClassName('step'))
                                        inputsForNoDisplay.map((el, i) => i > 0 ? el.style.display = 'none' : el.style.display = 'block')
                                    }}
                                />
                            </section>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    parts: state.partsState.parts
})
const mapDispatchToProps = dispatch => ({
    newPart: (name, group) => dispatch(newPart(name, group))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPart)

