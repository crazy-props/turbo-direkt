import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import TransitionsTooltips from "./AppBarToolTipFor";
import logo from "../../img/logo.png"


const styles = {
    title: {
        cursor: 'pointer',
        marginLeft: "10rem",
    },
    logo: {
        height: "4rem",
        width: "4rem",
        marginLeft: "4rem",

    },
    appBar: {
        marginTop: "1px",
        background: "#f7f7f7",
    },
};
const AppBarMini = () => (
    <AppBar
        iconElementLeft={
            <Link to={'/'}>
                <div>
                    <img style={styles.logo} src={logo} />
                </div>
            </Link>
        }
        iconElementRight={<TransitionsTooltips style={styles.tooltip} />}
        style={styles.appBar}
    />
);

export default AppBarMini;
