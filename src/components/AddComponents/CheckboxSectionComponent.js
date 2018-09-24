import React from 'react';
import {connect} from "react-redux";
import AddCarInputsAndButtons from "./AddCarInputsAndButtons";
import AddPart from './AddPart'
import {Tabs, Tab} from 'material-ui/Tabs';

class CheckboxSectionComponent extends React.Component {
    state = {
        stepIndex: 0
    };


    render() {
        return (
            <div>
                {this.props.turbines && this.props.cars && this.props.turbines.length && this.props.cars.length
                    ?
                    <Tabs>
                        <Tab label="Dodaj samochód">
                            <div>
                                <AddCarInputsAndButtons
                                    stepIndex={this.state.stepIndex}/>
                            </div>
                        </Tab>
                        <Tab label="Dodaj Część">
                            <div>
                                <AddPart/>
                            </div>
                        </Tab>
                        <Tab
                            label="Dodaj Turbinę"
                        >
                        </Tab>
                    </Tabs>
                    :
                    'loading'
                }
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

