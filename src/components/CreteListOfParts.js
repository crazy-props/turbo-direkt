import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux'
/**
 * With the `maxHeight` property set, the Select Field will be scrollable
 * if the number of items causes the height to exceed this limit.
 */
class CreateListOfParts extends Component {
	state = {
		_parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
		push: {
			compressor_wheel: [],
			turbine_wheel: [],
			bearing_housing: [],
			back_plate: [],
			heat_shield: [],
			nozzle: [],
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
		this.setState({ push: { ...this.state.push, [name]: [...this.state.push[name], value] } })
	}

	render() {
		console.log(this.state.push)
		return (this.props.part && this.props.part.length ?
			this.state._parts.map(singlePart =>
				<div>
					{`${singlePart}: `}
					<SelectField
						key={this.state.push[singlePart]}
						value={this.state.push[singlePart]}
						onChange={this.handleChange(singlePart)}
					>
						{
							this.props.part
								.filter(part =>
									part.group === singlePart)
								.map(part =>
									<MenuItem
										value={part.part}
										key={part.part}
										primaryText={`${part.part}`} />)
						}
					</SelectField>
					{this.state.push[singlePart] && this.state.push[singlePart].length > 0 ?
						this.state.push[singlePart].map(x => <span>{x} </span>)
						:
						`--------`}
				</div>)
			: 'Load'
		)
	}
}

const mapStateToProps = state => ({
	part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateListOfParts)