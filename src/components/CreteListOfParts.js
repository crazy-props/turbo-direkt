import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTurboToList } from '../state/turboState'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Spinner from './Spinner'

/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
class CreateListOfParts extends Component {
	state = {
		_parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
		push: {
			turboOEM: '',
			compressor_wheel: [],
			turbine_wheel: [],
			bearing_housing: [],
			back_plate: [],
			heat_shield: [],
			nozzles: [],
			actuator: [],
			gasket_kit: [],
			repair_kit: [],
			KODE_CHRA: [],
		}
	};

	/**
	* 'handleChange' function is require to mapping all state _parts to each value handle function. 
	* Name value is convert to object key property. 
	*/

    handleChange = name => (event, index, value) => {
        this.setState({ push: { ...this.state.push, [name]: value } })
    }


	textChangeHandler = (e, value) => this.setState({ push: { ...this.state.push, turboOEM: value } })

    addPartToList = () => this.state.push.turboOEM.length > 0 ? this.props.addTurboToList(this.state.push) : alert(`Add turbo name idiot!`)

    selectionRenderer = (values) => {
        switch (values.length) {
            case 0:
                return '';
            default:
                return `${values.map(x => x)}`;
        }
    }
    render() {
        console.log(JSON.stringify(this.state.push))

        return (this.props.part && this.props.part.length ?
            <Card>
            <CardHeader
        title="Add turbo"
        subtitle="cos tam"
        actAsExpander={true}
        showExpandableButton={true}
        />
        <CardText expandable={true}>
            <h3>{`Podaj nazwę tworzonej turbiny: `}</h3>
        <TextField
        hintText="turboOem"
        onChange={this.textChangeHandler}
        />
        <div> {`Nazwa turbiny: ${this.state.push.turboOEM}`} </div>
        <hr /><br />
        {this.state._parts.map(singlePart =>
        <div>
        <h3>{`Wybierz część z zestawu ${singlePart}: `}</h3>
        <SelectField
        key={singlePart}
        multiple={true}
        hintText='Zaznacz część'
        value={this.state.push[singlePart]}
        onChange={this.handleChange(singlePart)}
        selectionRenderer={this.selectionRenderer}
    >
        {
            this.props.part
                .filter(part =>
                    part.group === singlePart)
                .map(part =>
            <MenuItem
            key={part.part}
            insetChildren={true}
            checked={this.state.push[singlePart].indexOf(part.part) > -1}
            value={part.part}
            primaryText={part.part}
            />)
        }
    </SelectField>
        <div>
        {'Wybrane części: '}
        {this.state.push[singlePart] && this.state.push[singlePart].length > 0 ?
            this.state.push[singlePart].map(x => <span>{x} </span>)
            :
            `--------`}
    <hr /><br />
        </div>
        </div>
    )}
    <RaisedButton secondary={true} onClick={this.addPartToList}> Add</RaisedButton>
        </CardText>

        </Card>
    : <Spinner />

    )
    }

}

const mapStateToProps = state => ({
	part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({
    addTurboToList: (el) => dispatch(addTurboToList(el))

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateListOfParts)