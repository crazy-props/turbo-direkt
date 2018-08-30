import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pagination from 'material-ui-pagination'
import style from '../style'
import PartsColumn from './ListOfTurbiness_SingleView'
import SearchInput from './SearchInput'

class ListOfTurbines extends Component {
   state = {
      _listOfParts: ['Turbo OEM', 'Compressor Wheel', 'Turbine Wheel', 'Bearing Housing', 'Back Plate', 'Heat Shield', 'Actuator', 'Noozles', 'Gasket Kit', 'Repair Kit', 'KODE CHRA'],
      _parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
      turbineName: '',
      // Pagination variables start: this variables are required for pagination view
      ITEMS_PER_PAGE: 10,
      currentPage: 0,
      //Pagination variables end
   }
   
   // neutralise to currentPage is required for reapper to first side of results
   handleTurbineNameChangeChandler = (e, value) => this.setState({ turbineName: value, currentPage: 0 })

   render() {

      const listOfTurbines = this.props.turbo && this.props.turbo
         .filter(nam => nam.turboOEM.toLowerCase().indexOf(this.state.turbineName.toLowerCase()) !== -1)
      
      //check to listOfTurbines is already update and asign array length to variable - reguired for pagination
      const numberOfTurbines = listOfTurbines && listOfTurbines.length

      return this.props.turbo === null && this.props.part === null ?
         <div style={{ textAlign: 'center' }}>Loading .... </div>
         :
         <div>
            <SearchInput
               handleTurbineNameChangeChandler={this.handleTurbineNameChangeChandler}
            />
            <table style={{margin: 'auto'}}>
               <thead >
                  <tr style={style.table_head} >
                     {this.state._listOfParts.map(el => <th>{el}</th>)}
                  </tr>
               </thead>
               <tbody style={style.table_body}>
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
                           <tr>
                              <td>{turbine.turboOEM}</td>
                              {this.state._parts.map(part => <PartsColumn parts={turbine[part]} />)}
                           </tr>
                     )}
               </tbody>
            </table>

            {/*show pagination numbers ander the table*/}
            <div style={{ textAlign: 'center' }}>
               <Pagination
                  total={Math.ceil(numberOfTurbines / this.state.ITEMS_PER_PAGE)}
                  current={this.state.currentPage + 1}
                  display={10}
                  onChange={newPage => this.setState({ currentPage: newPage - 1 })}
               />
            </div>
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