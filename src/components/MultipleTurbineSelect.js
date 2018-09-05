import React, { Component } from 'react';
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';

/**
 * The rendering of selected items can be customized by providing a `selectionRenderer`.
 */
class MultipleTurbineSelect extends Component {
    state = {
        values: [],
    };

    handleChange = (event, index, values) => this.setState({ values });

    selectionRenderer = (values) => {
        switch (values.length) {
            case 0:
                return '';
            case 1:
                return this.props.part.part;
            default:
                return `${values.map(x => x)}`;
        }
    }

    menuItems(parts) {
        return parts.filter(part => part.group === 'actuator').sort((part1, part2) => part1.part - part2.part).map((parts) => (
            <MenuItem
                key={parts.part}
                insetChildren={true}
                checked={this.state.values.indexOf(parts.part) > -1}
                value={parts.part}
                primaryText={parts.part}
            />
        ));
    }

    render() {
        console.log(this.state)

        return (
            <SelectField
                multiple={true}
                hintText="Zaznacz części"
                value={this.state.values}
                onChange={this.handleChange}
                selectionRenderer={this.selectionRenderer}
            >
                {this.menuItems(this.props.part)}
            </SelectField>
        );
    }
}

const mapStateToProps = state => ({
    part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleTurbineSelect)