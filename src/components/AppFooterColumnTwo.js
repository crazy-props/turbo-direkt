import React from 'react';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import Subheader from "material-ui/Subheader";
import {indigo500} from 'material-ui/styles/colors';
import {List, ListItem} from "material-ui/List";
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
const styles={
    subHeader:{
        fontWeight: "bolder",
        fontSize: "1.8vh",
        fontFamily: 'Lato',
    },
    listItem:{
        display:"flex",
        justifyContent:"space-around",
        cursor: "help"
    }
};
const AppFooterColumnTwo = () => {
    return (
        <div>
            <List>
                <Subheader style={styles.subHeader}>POMOC TECHNICZNA</Subheader>
                <br/>
                <ListItem style={styles.listItem} primaryText="Email" leftIcon={<CommunicationEmail color={indigo500}/>} href="mailto:someone@example.com?Subject=Hello%20again" target="_top" />
                <ListItem style={styles.listItem} primaryText="Phone"  leftIcon={<CommunicationCall color={indigo500} />} href="tel:+48781004500"/>
            </List>
        </div>
    );
};

export default AppFooterColumnTwo;
