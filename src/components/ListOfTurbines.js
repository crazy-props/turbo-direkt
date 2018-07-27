import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from '../style'


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
                        <td>
                           <ul>
                              {x.compressor_wheel && x.compressor_wheel.length ? x.compressor_wheel.map(x => <li>{x}</li>) : x.compressor_wheel}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.turbine_wheel && x.turbine_wheel.length ? x.turbine_wheel.map(x => <li>{x}</li>) : x.turbine_wheel}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.bearing_housing && x.bearing_housing.length ? x.bearing_housing.map(x => <li>{x}</li>) : x.bearing_housing}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.back_plate && x.back_plate.length ? x.back_plate.map(x => <li>{x}</li>) : x.back_plate}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.heat_shield && x.heat_shield.length ? x.heat_shield.map(x => <li>{x}</li>) : x.heat_shield}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.nozzles && x.nozzles.length ? x.nozzles.map(x => <li>{x}</li>) : x.nozzles}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.actuator && x.actuator.length ? x.actuator.map(x => <li>{x}</li>) : x.actuator}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.gasket_kit && x.gasket_kit.length ? x.gasket_kit.map(x => <li>{x}</li>) : x.gasket_kit}
                           </ul>
                        </td>
                        <td>
                           <ul>
                              {x.repair_kit && x.repair_kit.length ? x.repair_kit.map(x => <li>{x}</li>) : x.repair_kit}
                           </ul>
                        </td>
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
