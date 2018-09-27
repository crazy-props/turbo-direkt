import React from 'react';
import Divider from 'material-ui/Divider';
const styles={
   copyRight:{
        fontSize: "1.2vh",
        fontFamily: 'Lato',
       cursor:"none"
    }
};
const AppFooterColumnThree = () => {
    return (
        <div style={styles.copyRight}>
            <Divider />
            <br/>
            <br/>
            Copyright © 2018 CrazyProps - M.Wójcicka, P.Wasil, P.Tarka
        </div>
    );
};

export default AppFooterColumnThree;
