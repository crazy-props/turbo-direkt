import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pagination from 'material-ui-pagination'
import Delete from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import PartsColumn from './ListOfTurbiness_SingleView'
import SearchInput from './SearchInput'
import { removeTurboFromList } from '../state/turboState'
import CreteListOfParts from './CreteListOfParts'
import Spinner from './Spinner'
import VerticalLinearStepper from './CreteNewTurbibne';

class ListOfTurbines extends Component {
	state = {
		_listOfParts: ['Turbo OEM', 'Compressor Wheel', 'Turbine Wheel', 'Bearing Housing', 'Back Plate', 'Heat Shield', 'Actuator', 'Noozles', 'Gasket Kit', 'Repair Kit', 'KODE CHRA', 'Delete'],
		_parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
		turbineName: '',
		/* Pagination variables start: this variables are required for pagination view*/
		ITEMS_PER_PAGE: 10,
		currentPage: 0,
		/*Pagination variables end*/
	}
	/* neutralise to currentPage is required for reapper to first side of results*/
	handleTurbineNameChangeChandler = (e, value) => this.setState({ turbineName: value, currentPage: 0 })

	render() {
		/*filter all turboOEM names, get only alphanumeric and lower case characters on the each single name value*/
		const listOfTurbines = this.props.turbo && this.props.turbo
			.filter(nam => nam.turboOEM
				.toLowerCase()
				.replace(/\W|_/gi, '')
				.indexOf(this.state.turbineName.toLowerCase()) !== -1)

		/*check to listOfTurbines is already update and asign array length to variable - reguired for pagination */
		const numberOfTurbines = listOfTurbines && listOfTurbines.length

		return this.props.turbo !== null && this.props.part !== null ?
			<div>
				{<VerticalLinearStepper />}
				<SearchInput
					handleTurbineNameChangeChandler={this.handleTurbineNameChangeChandler}
				/>
				<table className="carsTable">
					<thead className="carsTableHead">
						<tr>
							{/*header table values*/
								this.state._listOfParts.map((el, idx) => <th key={idx}>{el}</th>)}
						</tr>
					</thead>
					<tbody >
						{listOfTurbines
							/*this block of code is responsible for pagination view:*/
							.filter((el, i) => (
								i >= this.state.ITEMS_PER_PAGE * this.state.currentPage
								&&
								i < this.state.ITEMS_PER_PAGE * (this.state.currentPage + 1)
							))
							/*this block of code mapping turbines state:*/
							.map(
								turbine =>
									<tr className="trOne" key={turbine.key}>
										<td>{turbine.turboOEM}</td>
										{this.state._parts.map((part, idx) => <PartsColumn key={idx} parts={turbine[part]} />)}
										<td>
											{/* dispatched function has own refernce to turbine.key property*/}
											<IconButton
												tooltip="Usuń"
												onClick={() => this.props.removeTurboFromList(turbine)}
											>
												<Delete />
											</IconButton>
										</td>
									</tr>
							)}
					</tbody>
				</table>
				{/*show pagination numbers under the table*/}
				<div style={{ textAlign: 'center' }}>
					<Pagination
						total={Math.ceil(numberOfTurbines / this.state.ITEMS_PER_PAGE)}
						current={this.state.currentPage + 1}
						display={10}
						onChange={newPage => this.setState({ currentPage: newPage - 1 })}
					/>
				</div>
			</div>
			:
			<Spinner />
	}
}
const mapStateToProps = state => ({
	turbo: state.turboState.turbo,
	part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({
	removeTurboFromList: (val) => dispatch(removeTurboFromList(val))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListOfTurbines)