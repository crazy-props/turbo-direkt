import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from '../style'
import PartsColumn from './ListOfTurbiness_SingleView'
import SearchInput from './SearchInput';


class ListOfTurbines extends Component {
   state = {
      _listOfParts: ['Turbo OEM', 'Compressor Wheel', 'Turbine Wheel', 'Bearing Housing', 'Back Plate', 'Heat Shield', 'Actuator', 'Noozles', 'Gasket Kit', 'Repair Kit', 'KODE CHRA'],
      _parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
      turbineName: '',
   }

   handleTurbineNameChangeChandler = (e, value) => this.setState({ turbineName: value });

   render() {

      const listOfTurbines = this.props.turbo && this.props.turbo
         .filter(nam => nam.turboOEM.toLowerCase().indexOf(this.state.turbineName.toLowerCase()) !== -1)

      return this.props.turbo === null && this.props.part === null ?
         <span>Loading .... </span>
         :
         <div>
            <SearchInput
               handleTurbineNameChangeChandler={this.handleTurbineNameChangeChandler}
            />
            <table>
               <thead >
                  <tr style={style.table_head} >
                     {this.state._listOfParts.map(el => <th>{el}</th>)}
                  </tr>
               </thead>
               <tbody >
                  {listOfTurbines.map(
                     turbine =>
                        <tr>
                           <td>{turbine.turboOEM}</td>
                           {this.state._parts.map(part => <PartsColumn parts={turbine[part]} />)}
                        </tr>
                  )}

               </tbody>
            </table>
         </div>
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