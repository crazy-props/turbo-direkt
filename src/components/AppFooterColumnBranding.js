import React from 'react';
import branding from "../img/branding.png";
import {ListItem} from "material-ui/List";

const styles = {
    branding: {

        marginLeft: "1rem",
        cursor:"pointer"

    },
};

const AppFooterColumnBranding = () => {
    return (
        <div>
            <br/>
        <div><img alt={"turbo direct branding"} style={styles.branding} src={branding} href="http://www.turbodirekt.at/" target="blank"/></div>
            <br/>
            <br/>
            <figure style={styles.branding}>
                Kloc Autoteile e.U. - Handel mit Kfz-Teilen
                Hirschstettnerstr. 19-21,, 1220 Wien
            </figure>
        </div>
    );
};

export default AppFooterColumnBranding ;
