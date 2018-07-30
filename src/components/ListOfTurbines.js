import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from '../style'
import { PartsColumn } from './ListOfTurbiness_SingleView'


class ListOfTurbines extends Component {
	render() {

		return this.props.turbo === null ?
			<span>Loading .... </span>
			:
			<table>
				<thead >
					<tr style={style.table_head} >
						<th>Turbo OEM</th>
						<th>Compressor Wheel</th>
						<th>Turbine Wheel</th>
						<th>Bearing Housing</th>
						<th>Back Plate</th>
						<th>Heat Shield</th>
						<th>Actuator</th>
						<th>Noozles</th>
						<th>Gasket Kit</th>
						<th>Repair Kit</th>
						<th>KODE CHRA</th>
					</tr>
				</thead>
				<tbody >
					{this.props.turbo.map(
						x =>
							<tr style={style.table_body}>
								<td>{x.turboOEM}</td>
								<PartsColumn parts={x.compressor_wheel} />
								<PartsColumn parts={x.turbine_wheel} />
								<PartsColumn parts={x.bearing_housing} />
								<PartsColumn parts={x.back_plate} />
								<PartsColumn parts={x.heat_shiel} />
								<PartsColumn parts={x.nozzles} />
								<PartsColumn parts={x.actuator} />
								<PartsColumn parts={x.gasket_kit} />
								<PartsColumn parts={x.repair_kit} />
								<td>{x.KODE_CHRA}</td>
							</tr>
					)}
				</tbody>
			</table>

	}
}


const mapStateToProps = state => ({
	turbo: state.turboState.turbo,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListOfTurbines)
