import React from 'react';
import AppBar from 'material-ui/AppBar';
import TransitionsTooltips from "./AppBarToolTipFor";
import logo from "../img/logo.png"



const styles = {
    title: {
        cursor: 'pointer',
        marginLeft: "10rem"
    },
    logo: {
        height: "4rem",
        width: "4rem",
        marginLeft: "4rem"

    },
    div: {
        margin: 'auto',
        marginBottom: '5%',
        position: "sticky"
    }

};
const AppBarMini = (props) => (
    <AppBar
        iconElementLeft={<div><img style={styles.logo} src={logo}/></div>}
        iconElementRight={<TransitionsTooltips style={styles.tooltip} logOutButton={props.logOutButton}/>}
        style={styles.div}

    />
);

export default AppBarMini;
