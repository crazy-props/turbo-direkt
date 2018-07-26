import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const styl={
    fontSize:"0.6rem",

}

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
                />
</div>
        );
    }
}
