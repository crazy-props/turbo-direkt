import {connect} from "react-redux";
import React from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';

function handleClick() {
    alert('onClick triggered on the title component');
}

const styles = {
    title: {
        cursor: 'pointer',
    },
};
const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
};

const rightSection = (
    <div>
        <List>
            <ListItem
                disabled={true}
                leftAvatar={
                    <Avatar src="images/uxceo-128.jpg" />
                }
            >
                Image Avatar
            </ListItem>
        </List>
        <FlatButton label="Logout" style={buttonStyle} onClick={handleClick}/>
    </div>
);
class AppBar extends Component {
    render() {
        return (
            <div>
                <AppBar
                    title={<span style={styles.title}>TurboDirekt by Kloc Autoteile</span>}
                    onTitleClick={handleClick}
                    iconElementLeft={<IconButton><NavigationClose/></IconButton>}
                    iconElementRight={rightSection}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar)