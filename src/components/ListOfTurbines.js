import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from '../style'
import PartsColumn from './ListOfTurbiness_SingleView'
import SearchInput from './SearchInput'
import Pagination from 'material-ui-pagination'

// const debounce = (fn, delay) => {
//    let timer = null;
//    return function () {
//       let context = this, args = arguments;
//       clearTimeout(timer);
//       timer = setTimeout(function () {
//          fn.apply(context, args);
//       }, delay);
//    };
// }
class ListOfTurbines extends Component {
   state = {
      _listOfParts: ['Turbo OEM', 'Compressor Wheel', 'Turbine Wheel', 'Bearing Housing', 'Back Plate', 'Heat Shield', 'Actuator', 'Noozles', 'Gasket Kit', 'Repair Kit', 'KODE CHRA'],
      _parts: ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA'],
      turbineName: '',
      ITEMS_PER_PAGE: 30,
      currentPage: 0
   }

   // handleTurbineNameChangeChandler = debounce(() => (e, value) => this.setState({ turbineName: value }), 2000);//this function doesn't work with Material UI!
   handleTurbineNameChangeChandler = (e, value) => this.setState({ turbineName: value })

   render() {

      const listOfTurbines = this.props.turbo && this.props.turbo
         .filter(nam => nam.turboOEM.toLowerCase().indexOf(this.state.turbineName.toLowerCase()) !== -1)

      const numberOfTurbines = listOfTurbines && listOfTurbines.length

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
                  {listOfTurbines
                     .filter((el, i) => (
                        i >= this.state.ITEMS_PER_PAGE * this.state.currentPage
                        &&
                        i < this.state.ITEMS_PER_PAGE * (this.state.currentPage + 1)
                     ))
                     .map(
                        turbine =>
                           <tr>
                              <td>{turbine.turboOEM}</td>
                              {this.state._parts.map(part => <PartsColumn parts={turbine[part]} />)}
                           </tr>
                     )}
               </tbody>
            </table>
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