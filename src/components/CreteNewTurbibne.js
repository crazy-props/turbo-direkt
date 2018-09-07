import React from 'react';
import { Step, Stepper, StepLabel, } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { connect } from 'react-redux'
import { addTurboToList } from '../state/turboState'
import { Card, CardHeader, CardText } from 'material-ui/Card'
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

	handleNext = () => {
		const { stepIndex } = this.state;
		this.setState({
			stepIndex: stepIndex + 1,
			finished: stepIndex >= 2,
		});
	};

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1 });
		}
	};

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

	getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div>
						<h3>{`Podaj nazwę tworzonej turbiny: `}</h3>
						<TextField
							hintText="turboOem"
							onChange={this.textChangeHandler}
						/>
						<div> {`Nazwa turbiny: ${this.state.push.turboOEM}`} </div>
					</div>);
			case 1:
				return (
					<div>
						{this.state._parts.map(singlePart =>
							<div>
								<Card>
									<CardHeader
										title={singlePart}
										//subtitle={singlePart}
										actAsExpander={true}
										showExpandableButton={true}
									/>
									<CardText expandable={true}>
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
									</CardText>
								</Card>
							</div>
						)}
					</div>)
					;
			case 2:
				return (
					<div>
						<RaisedButton secondary={true} onClick={this.addPartToList}> Add</RaisedButton>
					</div>);
			default:
				return 'You\'re a long way from home sonny jim!';
		}
	}

	render() {
		const { finished, stepIndex } = this.state;
		const contentStyle = { margin: '0 16px' };

		return (
			<div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
				<Stepper activeStep={stepIndex}>
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
					{finished ? (
						<p>
							<a
								href="#"
								onClick={(event) => {
									event.preventDefault();
									this.setState({ stepIndex: 0, finished: false });
								}}
							>
								Click here
              </a> to reset the example.
            </p>
					) : (
							<div>
								<p>{this.getStepContent(stepIndex)}</p>
								<div style={{ marginTop: 12 }}>
									<FlatButton
										label="Back"
										disabled={stepIndex === 0}
										onClick={this.handlePrev}
										style={{ marginRight: 12 }}
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
		);
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
)(HorizontalLinearStepper)
