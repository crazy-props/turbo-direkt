import React from 'react';
import AppBar from 'material-ui/AppBar';
import TransitionsTooltips from "../Common/AppBarToolTipFor";
import logo from "../../img/logo.png"
import {Link} from 'react-router-dom'
import {logOut} from "../../state/authState";
import CheckboxSectionComponent from '../AddComponents/CheckboxSectionComponent'
import Drawer from 'material-ui/Drawer';


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

class AppBarMini extends React.Component {
    state = {
        open: false
    };

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
                <AppBar
                    iconElementLeft={
                        <Link to={'/'}>
                            <div>
                                <img style={styles.logo} src={logo}/>
                            </div>
                        </Link>
                    }

                    iconElementRight={<div>
                        <button onClick={this.handleToggle}>dodaj coś</button>
                        <TransitionsTooltips style={styles.tooltip} logOutButton={logOut}/></div>}
                    style={styles.div}
                />
                <Drawer open={this.state.open}>
                    <CheckboxSectionComponent/>
                </Drawer>
            </div>
        )
    }
}

export default AppBarMini;
