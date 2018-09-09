import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { connect } from 'react-redux'
import { addTurboToList } from '../state/turboState'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import TableWithCreatingTurbine from './CreteNewTurbinr_Table';

class CreteNewTurbine extends React.Component {

	state = {
		finished: false,
		stepIndex: 0,
		_parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
		dataToUpdate: {
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

	handleNext = () => {
		const { stepIndex } = this.state;
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2,
		})
	}

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 })
		}
	}

	/**
	* 'handleChange' function is require to mapping all state _parts to each value handle function. 
	* Name value is convert to object key property. 
	*/
	handleChange = name => (event, index, value) => {
		this.setState({ dataToUpdate: { ...this.state.dataToUpdate, [name]: value } })
	}

	textChangeHandler = (e, value) => this.setState({ dataToUpdate: { ...this.state.dataToUpdate, turboOEM: value } })

	addPartToList = () => this.state.dataToUpdate.turboOEM.length > 0 ? this.props.addTurboToList(this.state.dataToUpdate) : alert(`Add turbo name idiot!`)

	selectionRenderer = (values) => {
		switch (values.length) {
			case 0:
				return '';
			default:
				return `${values.map(x => x)}`;
		}
	}

	getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div>
						<h3>{`Wpisz nazwę tworzonej turbiny: `}</h3>
						<TextField
							hintText="turboOem"
							onChange={this.textChangeHandler}
						/>
						<div> {`Nazwa turbiny: ${this.state.dataToUpdate.turboOEM}`} </div>
					</div>);
			case 1:
				return (
					<div>
						{this.state._parts.map(singlePart =>
							<Card>
								<CardHeader
									title={singlePart}
									actAsExpander={true}
									showExpandableButton={true}
								/>
								<CardText expandable={true}>
									<SelectField
										key={singlePart}
										multiple={true}
										hintText='Zaznacz część'
										value={this.state.dataToUpdate[singlePart]}
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
														checked={this.state.dataToUpdate[singlePart].indexOf(part.part) > -1}
														value={part.part}
														primaryText={part.part}
													/>)
										}
									</SelectField>
									<div>
										{'Wybrane części: '}
										{this.state.dataToUpdate[singlePart] && this.state.dataToUpdate[singlePart].length > 0 ?
											this.state.dataToUpdate[singlePart].map(x => <span>{x} </span>)
											:
											`--------`}
									</div>
								</CardText>
							</Card>
						)}
					</div>)
					;
			case 2:
				return (
					<div>
						<RaisedButton secondary={true} onClick={this.addPartToList}> Zatwierdź </RaisedButton>
					</div>);
			default:
				return console.log('Problem with getStepContent function ');
		}
	}
	handleRequestPartsDelete = (part, idx) => {
		alert(JSON.stringify(this.state.dataToUpdate[part][idx]))
	}
	render() {
		const contentStyle = { margin: '0 16px' }

		return (
			<div>
				<TableWithCreatingTurbine
					creatingTurbine={this.state.dataToUpdate}
					handleRequestPartsDelete={this.handleRequestPartsDelete}
				/>
				<div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
					<Stepper activeStep={this.state.stepIndex}>
						<Step>
							<StepLabel>Dodaj nazwę turbiny</StepLabel>
						</Step>
						<Step>
							<StepLabel>Dodaj komponenty do turbiny</StepLabel>
						</Step>
						<Step>
							<StepLabel>Zatwierdź</StepLabel>
						</Step>
					</Stepper>
					<div style={contentStyle}>
						{this.state.finished ? (
							<p>
								<a
									href="#"
									onClick={(event) => {
										event.preventDefault();
										this.setState({ stepIndex: 0, finished: false });
									}}
								>
									Dodaj kolejną turbinę
              </a> .
            </p>
						) : (
								<div>
									<p>{this.getStepContent(this.state.stepIndex)}</p>
									<div style={{ marginTop: 12 }}>
										<FlatButton
											label="Wstecz"
											disabled={this.state.stepIndex === 0}
											onClick={this.handlePrev}
											style={{ marginRight: 12 }}
										/>
										<RaisedButton
											label={this.state.stepIndex === 2 ? 'Koniec' : 'Dalej'}
											disabled={this.state.dataToUpdate.turboOEM.length === 0}
											primary={true}
											onClick={this.handleNext}
										/>
									</div>
								</div>
							)}
					</div>
				</div>
			</div>
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
)(CreteNewTurbine)