import React from 'react';
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


export default class DialogExampleSimple extends React.Component {
    

    render() {
        const actions = [
            <FlatButton
                label="Anuluj"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <FlatButton
                label="Usuń"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleDelete}
            />,
        ]

        return (

            <Dialog
                title="Czy na pewno chcesz usunąć element z listy?"
                actions={actions}
                modal={true}
                open={this.props.stateDialog}
                onRequestClose={this.props.handleClose}
            >
                Wybierz "Usuń" aby usunąć element z listy lub "Anuluj" aby powrócić do listy.
        </Dialog>

        );
    }
}
