import React from 'react';
import Divider from 'material-ui/Divider';
const styles = {
    copyRight: {
        fontSize: "0.5rem",
        fontFamily: 'Lato',
        cursor: "none",
        color: 'darkgrey'
    }
};
const AppFooterColumnThree = () => {
    return (
        <div style={styles.copyRight}>
            <Divider />
            <br />
            <br />
            Copyright © 2018 CrazyProps - M.Wójcicka, P.Wasil, P.Tarka
        </div>
    );
};

export default AppFooterColumnThree;
