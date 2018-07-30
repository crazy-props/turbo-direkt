import React from 'react'
import Divider from '@material-ui/core/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500,blue500} from 'material-ui/styles/colors';
import logo from "../img/logo.png";
import {connect} from 'react-redux'
import {addEmail,sendRequestForPass} from "../state/forgotPassword";


const style = {
    height: "75%",
    borderRadius:"10px",
    textAlign: 'center',
    opacity: "0.77",
    width: "52%",
    marginLeft: "25%",
    marginRight: "25%",
    floatingLabelStyle: {
        color: blue500,
        fontSize: 14
    },
    floatingLabelFocusStyle: {
        color: red500,
        fontSize: 12
    },
    insideformdivider: {
        marginLeft: "20%",
        marginRight: "20%"
    },
    button: {
        color: blue500,
        borderRadius: 25
    },
    logo: {
        height: "5.5rem",
        width: "5.5rem",
    },

}


const ForgotenPasswordByUser = (props) => (
    <div className="logintop">
        <br/>
        <br/>
        <Paper className="loginpaper" style={style} zDepth={3}>
            <br/>
            <div><img style={style.logo} src={logo}/></div>
            <p className="ptoplogin">Create new user</p>
            <br/>
            <div className="insideformdiv">
                <TextField
                    name={"email"}
                    onChange={props.onPassEmailHandler}
                    floatingLabelText="Type your email"
                    floatingLabelStyle={style.floatingLabelStyle}
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                />
            </div>
            <Divider className="insideformdivider" style={style.insideformdivider}/>
            <br/>
            <div className="insideformdiv">
                <RaisedButton label="Send" onClick={()=> (props.sendPass(),props.getPassword())} fullWidth={true} primary={true} style={style.button}/>
            </div>
            <br/>
            <br/>
        </Paper>
        <br/>
    </div>
);
const mapStateToProps = (state) => ({

    email: state.forgotPassword.email
})

const mapDispatchToProps = (dispatch) => ({

    onPassEmailHandler: (event, value) => dispatch(addEmail(value)),

    sendPass: () => dispatch(sendRequestForPass())

})


export default connect(mapStateToProps, mapDispatchToProps)(ForgotenPasswordByUser)