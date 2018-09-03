import React from 'react';
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
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
/**
 * A basic vertical non-linear implementation
 */const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
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
    };
    updateCheck() {
        this.setState((oldState) => {
            return {
                checked: !oldState.checked,
            };
        });
    }
    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'You\'re a long way from home sonny jim!';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            this.state.checked?
            <div>
                <Checkbox
                    label="Simple with controlled value"
                    checked={this.state.checked}
                    onCheck={this.updateCheck.bind(this)}
                    style={styles.checkbox}
                />
                <Checkbox
                    label="Simple with controlled value"
                    checked={this.state.checked}
                    onCheck={this.updateCheck.bind(this)}
                    style={styles.checkbox}
                />
                <Checkbox
                    label="Simple with controlled value"
                    checked={this.state.checked}
                    onCheck={this.updateCheck.bind(this)}
                    style={styles.checkbox}
                />

                this.state.checked?
                <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                    <Stepper activeStep={stepIndex}>
                        <Step>
                            <StepLabel>Select campaign settings</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Create an ad group</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Create an ad</StepLabel>
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
                                    <FlatButton
                                        label="Back"
                                        disabled={stepIndex === 0}
                                        onClick={this.handlePrev}
                                        style={{marginRight: 12}}
                                    />
                                    <RaisedButton
                                        label={stepIndex === 2 ? 'Finish' : 'Next'}
                                        primary={true}
                                        onClick={this.handleNext}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>:
                <div>
                    <Checkbox
                        label="Simple with controlled value"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="Simple with controlled value"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="Simple with controlled value"
                        checked={this.state.checked}
                        onCheck={this.updateCheck.bind(this)}
                        style={styles.checkbox}
                    />
                </div>
        );
    }
}

export default HorizontalLinearStepper;