import React from 'react'
import {connect} from "react-redux"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
    Zindex:0
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */

class SingleTurbine extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});

    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,

        ];
        const props = this.props
        if (this.state.open === true)
            return (
                <div >
                        <Dialog
                            title={`PARTS FOR TURBO OEM : ${props.turbine}`}
                            actions={actions}
                            modal={true}
                            contentStyle={customContentStyle}
                            open={this.state.open}
                        >
                            {
                                Object.values(props.turbo.filter(turbo => turbo.turboOEM === props.turbine)[0])
                                //discard id and turboOEM to arr
                                    .filter(x => typeof x !== 'string')
                                    //create single array
                                    .reduce((red, val) => red
                                        .concat(val.reduce((red, val) => red.concat(val), [])), [])
                                    //get all values and compare to part state (value: part )
                                    .map(part => props.part.filter(x => x.part === part))
                                    //show results (part name + part amount)
                                    .map(x => x.map(val =>`${val.group.toUpperCase().replace(/_/, ' ')} - ${val.part}: ${val.amount}`)
                            ).map(el=>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{el[0]}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>)}
                        </Dialog>
                    </div>)
        else if (this.state.open === false)
        return (
            <ul>
                <li>
                    <div>
                        <RaisedButton label={props.turbine} onClick={this.handleOpen}/>
                    </div>

                </li>
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    turbo: state.turboState.turbo,
    part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleTurbine)

