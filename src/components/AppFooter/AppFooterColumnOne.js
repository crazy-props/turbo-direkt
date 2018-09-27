import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const styles = {
    subHeader: {
        fontWeight: "bolder",
        fontSize: "1.7vh",
        fontFamily: 'Lato',
        color: "#b10303"

    },
    listItem: {
        display: "flex",
        justifyContent: "flex-start",
        marginLeft: "15%",
        color: "#424242"
    }
};

const AppFooterColumnOne = () => {
    return (
        <div>
            <List>
                <Subheader style={styles.subHeader}>PRZYDATNE LINKI</Subheader>
                <ListItem style={styles.listItem} primaryText="Kode - Turbocharger Parts"
                    href="http://kodeturbo.com/index.php" target="blank" />
                <ListItem style={styles.listItem} primaryText="Garrett - Featured Turbochargers"
                    href="https://www.turbobygarrett.com/turbobygarrett/turbochargers" target="blank" />
                <ListItem style={styles.listItem} primaryText="Turbo Centras - Products Catalogue"
                    href="https://turbocentras.com/pl/katalog-czesci.html/" target="blank" />
            </List>
        </div>
    );
};

export default AppFooterColumnOne;
