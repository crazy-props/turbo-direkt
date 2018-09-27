import React from 'react';
import branding from "../../img/branding.png";

const styles = {
    brandinglogo: {
        marginLeft: "0.9rem",
        cursor:"pointer"

    },
    brandingtext: {
        marginLeft: "2.8rem",
        cursor:"pointer"

    },
};

const AppFooterColumnBranding = () => {
    return (
        <div>
            <br/>
        <div><img alt={"turbo direct branding"} style={styles.brandinglogo} src={branding} href="http://www.turbodirekt.at/" target="blank"/></div>
            <br/>
            <br/>
            <figure style={styles.brandingtext}>
                Kloc Autoteile e.U. - Handel mit Kfz-Teilen
                Hirschstettnerstr. 19-21, 1220 Wien
            </figure>
        </div>
    );
};

export default AppFooterColumnBranding ;
