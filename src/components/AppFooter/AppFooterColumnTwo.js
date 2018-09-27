import React from 'react';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import Subheader from "material-ui/Subheader";
import {List, ListItem} from "material-ui/List";
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
const styles={
    subHeader:{
        fontWeight: "bolder",
        fontSize: "1.7vh",
        fontFamily: 'Lato',
        color:"#b10303"
    },
    listItem:{
        display:"flex",
        justifyContent:"space-around",
        cursor: "help",
        color:"#424242"

    },
};

const AppFooterColumnTwo = () => {
    return (
        <div>
            <List>
                <Subheader style={styles.subHeader}>POMOC TECHNICZNA</Subheader>
                <br/>
                <ListItem style={styles.listItem} primaryText="Email" leftIcon={<CommunicationEmail color={"#b10303"}/>} href="mailto:someone@example.com?Subject=Hello%20again" target="_top" />
                <ListItem style={styles.listItem} primaryText="Phone"  leftIcon={<CommunicationCall color={"#b10303"} />} href="tel:+48781004500"/>
            </List>
        </div>
    );
};

export default AppFooterColumnTwo;
