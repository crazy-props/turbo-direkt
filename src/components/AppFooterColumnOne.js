import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ActionGrade from 'material-ui/svg-icons/action/grade';


const styles={
   subHeader:{
    fontWeight: "bolder",
    fontSize: "2vh",
    fontFamily: 'Lato',
}
};

const AppFooterColumnOne = () => {
    return (
            <List>
                <Subheader style={styles.subHeader}>PRZYDATNE LINKI</Subheader>
                <ListItem primaryText="Kode - Turbocharger Parts" href="http://kodeturbo.com/index.php" target="blank"/>
                <ListItem primaryText="Garrett - Featured Turbochargers" href="https://www.turbobygarrett.com/turbobygarrett/turbochargers" target="blank"/>
                <ListItem primaryText="Turbo Centras - Products Catalogue" href="https://turbocentras.com/pl/katalog-czesci.html/" target="blank" />
            </List>
    );
};

export default AppFooterColumnOne;
