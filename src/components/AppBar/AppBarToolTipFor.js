import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { ToolbarSeparator } from 'material-ui/Toolbar';
import { logOut } from "../../state/authState";
import { Link } from 'react-router-dom'

function TransitionsTooltips() {
    return (
        <div className="tooltip">
            <ToolbarSeparator />
            <Link to={'/parts'}>
                <Tooltip TransitionComponent={Zoom} title="Części na magazynie">
                    <Button>Magazyn</Button>
                </Tooltip>
            </Link>
            <Link to={'/turbines'}>
                <Tooltip TransitionComponent={Zoom} title="Katalog-TurboOEM">
                    <Button>Turbiny</Button>
                </Tooltip>
            </Link>
            <Link to={'/cars'}>
                <Tooltip TransitionComponent={Zoom} title="Katalog-Samochody">
                    <Button>Samochody</Button>
                </Tooltip>
            </Link>
            <Link to={'/shopping-list'}>
                <Tooltip TransitionComponent={Zoom} title="Lista zakupów">
                    <Button>Lista zamówień</Button>
                </Tooltip>
            </Link>
            <Button onClick={logOut()}>Wylogowanie</Button>

            <br />
        </div>
    );
}



export default TransitionsTooltips

