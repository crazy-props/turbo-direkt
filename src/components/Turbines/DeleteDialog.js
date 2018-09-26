import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

export default class DeleteDialog extends React.Component {
    render() {
        const actions = [
            <RaisedButton
                label="Anuluj"
                primary={true}
                onClick={this.props.handleClose}
            />,
            <RaisedButton
                label="Usuń"
                secondary={true}
                keyboardFocused={true}
                onClick={this.props.handleDelete}
            />,
        ]

        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                modal={true}
                open={this.props.stateDialog}
                onRequestClose={this.props.handleClose}
            >
                Wybierz "Usuń" aby usunąć element z listy lub "Anuluj" aby powrócić do listy.
            </Dialog>
        )
    }
}