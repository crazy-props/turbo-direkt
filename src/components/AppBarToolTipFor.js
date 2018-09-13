import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import {ToolbarSeparator} from 'material-ui/Toolbar';
import {logOut} from "../state/authState";



function TransitionsTooltips() {
    return (
        <div className="tooltip">
            <ToolbarSeparator />
            <Tooltip TransitionComponent={Zoom} title="Parts on magazine">
                <Button>Magazyn</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Open turbochargers table">
                <Button>Turbiny</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Open cars and models">
                <Button>Samochody</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="My orders">
                <Button>Lista zamówień</Button>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="My orders">
                <Button onClick={logOut()}>Wylogowanie</Button>
            </Tooltip>
            <br/>
        </div>
    );
}



export default TransitionsTooltips

