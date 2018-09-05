import React, { Component } from 'react';
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';

const persons = [
    { value: 0, name: 'Oliver Hansen' },
    { value: 1, name: 'Van Henry' },
    { value: 2, name: 'April Tucker' },
    { value: 3, name: 'Ralph Hubbard' },
    { value: 4, name: 'Omar Alexander' },
    { value: 5, name: 'Carlos Abbott' },
    { value: 6, name: 'Miriam Wagner' },
    { value: 7, name: 'Bradley Wilkerson' },
    { value: 8, name: 'Virginia Andrews' },
    { value: 9, name: 'Kelly Snyder' },
];

/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
class SelectFieldExampleSelectionRenderer extends Component {
    state = {
        values: [],
    };

    handleChange = (event, index, values) => this.setState({ values });

    selectionRenderer = (values) => {
        switch (values.length) {
            case 0:
                return '';
            case 1:
                return this.props.turbo.turboOEM;
            default:
                return `${values.length} names selected`;
        }
    }

    menuItems(persons) {
        return persons.map((person) => (
            <MenuItem
                key={person.turboOEM}
                insetChildren={true}
                checked={this.state.values.indexOf(person.turboOEM) > -1}
                value={person.turboOEM}
                primaryText={person.turboOEM}
            />
        ));
    }
    filter = this.props.turbo && this.props.turbo.length ? this.props.turbo.map(x => x.turboOEM).filter((val, idx, arr) => arr.indexOf(val) !== idx).map(x => { Object.assign({}, { turboOEM: x }) }) : []

    render() {
        console.log(this.state)

        return (
            <SelectField
                multiple={true}
                hintText="Select a name"
                value={this.state.values}
                onChange={this.handleChange}
                selectionRenderer={this.selectionRenderer}
            >
                {this.menuItems(this.props.turbo)}
            </SelectField>
        );
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
)(SelectFieldExampleSelectionRenderer)