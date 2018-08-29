import React, {Component} from 'react'
import {connect} from "react-redux";
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import {Grid, Row, Col} from 'react-flexbox-grid';
import {newPart} from "../state/partsState";


class AddPart extends Component {
    state = {
        value: 1,
        partsName: ''
    }

    handleChange = (event, index, value) => this.setState({value});

    addNewPart() {
        const addedPartsName = this.state.partsName
        const stateValue = this.state.value
        const arrayOfGroups = ['actuator', 'back_plate', 'compressor_wheel', 'gasket_kit',
            'heat_shield', 'KODE_CHRA', 'nozzles', 'repair_kit', 'turbine_wheel']
        const addedPartsGroup = arrayOfGroups[stateValue - 1]

        if(this.props.parts.find(element => element.part.toLowerCase() === addedPartsName.toLocaleLowerCase())){
            alert ('this part already exists in the system')
        }
        else {
            this.props.newPart(addedPartsName, addedPartsGroup)
        }
    }


    render() {
        return (
            <Grid>
                <Row>
                    <TextField
                        floatingLabelText="Parts name"
                        onChange={(e, val) => this.setState({partsName: val})}
                    />
                </Row>
                <Row>
                    <SelectField
                        floatingLabelText="Group of parts"
                        onChange={() => this.handleChange()}
                        value={this.state.value}
                    >
                        <MenuItem value={1} primaryText="actuator"/>
                        <MenuItem value={2} primaryText="back plate"/>
                        <MenuItem value={3} primaryText="bearing housing"/>
                        <MenuItem value={4} primaryText="compressor wheel"/>
                        <MenuItem value={5} primaryText="gasket kit"/>
                        <MenuItem value={6} primaryText="heat shield"/>
                        <MenuItem value={7} primaryText="KODE CHRA"/>
                        <MenuItem value={8} primaryText="nozzles"/>
                        <MenuItem value={9} primaryText="repair kit"/>
                        <MenuItem value={10} primaryText="turbine wheel"/>
                    </SelectField>
                </Row>
                <Row>
                    <RaisedButton
                        onClick={() => this.addNewPart()}>
                        Submit
                    </RaisedButton>

                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    parts: state.partsState.parts,

})

const mapDispatchToProps = dispatch => ({
    newPart: (partsName, partsGroup) => dispatch(newPart(partsName, partsGroup)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPart)
