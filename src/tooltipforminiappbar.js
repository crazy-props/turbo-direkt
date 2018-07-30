import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import {ToolbarSeparator} from 'material-ui/Toolbar';

function TransitionsTooltips() {
    return (
        <div className="tooltip">
            <ToolbarSeparator />
            <Tooltip TransitionComponent={Zoom} title="Parts on magazine">
                <Button>Stockroom</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Open turbochargers table">
                <Button>Turbochargers</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Open cars and models">
                <Button>Cars</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="My orders">
                <Button>Shopping List</Button>
            </Tooltip>
            <br/>
        </div>
    );
}

export default TransitionsTooltips;