import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import initCars from '../state/carsState'

const styl={
    fontSize:"0.6rem",

}
//const carmodels= this.props.cars.map(el=>el.mark)

const colors = [

    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White',
];

const menuProps = {
    desktop: true,
    disableAutoFocus: true,
};

/**
 * Provide props to be passed into the Menu component.
 */
export default class AutoCompleteForm extends Component {
    render() {
        return (
<div className="autodraver">
                <AutoComplete
                    textFieldStyle={styl}
                    hintText="Search"
                    dataSource={colors}
                    menuProps={menuProps}
                   // onChange={console.log(initCars)}
                />
</div>
        );
    }
}
const mapStateToProps = state => ({
    cars: state.carsState.cars,
})