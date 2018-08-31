import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from "react-redux"

const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
class DialogButton extends React.Component {

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
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        const props = this.props
        return (

            <div>
                <RaisedButton label={props.turbine} onClick={this.handleOpen} />
                <Dialog
                    title={props.turbine}
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.state.open}
                >
                    {this.handleDialogText.bind(this)}

                </Dialog>
            </div>
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
)(DialogButton)