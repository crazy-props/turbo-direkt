import React from 'react';
import AppBar from 'material-ui/AppBar';
import TransitionsTooltips from "./AppBarToolTipFor";
import logo from "../../img/logo.png"
import {Link} from 'react-router-dom'


const styles = {
    title: {
        cursor: 'pointer',
        marginLeft:"10rem"
    },
    logo: {
        height:"4rem",
        width: "4rem",
        marginLeft:"4rem"

    },
    div:{
        marginTop:"1px"
    }

};
const AppBarMini = () => (
    <AppBar
        iconElementLeft={
            <Link to={'/'}>
                <div>
                    <img style={styles.logo} src={logo}/>
                </div>
            </Link>
        }
        iconElementRight={<TransitionsTooltips style={styles.tooltip}/>}
        style={styles.div}

    />
);

export default AppBarMini;
