import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import {ToolbarSeparator} from 'material-ui/Toolbar';

 const TransitionsTooltips = (props) => {
    return (
        <div className="tooltip">
            <ToolbarSeparator/>
            <Link to={'/parts'}>
                <Tooltip TransitionComponent={Zoom} title="Magazyn">
                    <Button>Magazyn</Button>
                </Tooltip>
            </Link>
            <Link to={'/turbines'}>
                <Tooltip TransitionComponent={Zoom} title="Turbiny">
                    <Button>Turbiny</Button>
                </Tooltip>
            </Link>
            <Link to={'/cars'}>
                <Tooltip TransitionComponent={Zoom} title="Samochody">
                    <Button>Samochody</Button>
                </Tooltip>
            </Link>
            <Link to={'/shopping-list'}>
                <Tooltip TransitionComponent={Zoom} title="Lista zakupów">
                    <Button>Zakupy</Button>
                </Tooltip>
            </Link>
            <Tooltip TransitionComponent={Zoom} title="Wyloguj">
                <Button onClick={props.logOutButton}>Wyloguj</Button>
            </Tooltip>
            <br/>
        </div>
    );
}

export default TransitionsTooltips;