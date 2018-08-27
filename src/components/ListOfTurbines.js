import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from '../style'
import PartsColumn from './ListOfTurbiness_SingleView'

/*
const IngredientsList = ({ list }) =>
	React.createElement('tr', null,
		list.map((ingredient, i) =>
			React.createElement('th', { key: i }, ingredient)
		)
	)
const Ingredients = React.createFactory(IngredientsList)
const list = ['Turbo OEM', 'Compressor Wheel', 'Turbine Wheel', 'Bearing Housing', 'Back Plate', 'Heat Shield', 'Actuator', 'Noozles', 'Gasket Kit', 'Repair Kit', 'KODE CHRA']
*/
class ListOfTurbines extends Component {
   render() {
      return this.props.turbo === null && this.props.part === null ?
         <span>Loading .... </span>
         :
         <table>
            <thead >
               {/* {Ingredients({ list })} */}
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
                        <PartsColumn parts={x.heat_shield} />
                        <PartsColumn parts={x.nozzles} />
                        <PartsColumn parts={x.actuator} />
                        <PartsColumn parts={x.gasket_kit} />
                        <PartsColumn parts={x.repair_kit} />
                        <PartsColumn parts={x.KODE_CHRA} />
                     </tr>
               )}
            </tbody>
         </table>
   }
}

const mapStateToProps = state => ({
   turbo: state.turboState.turbo,
   part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ListOfTurbines)