import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500,blue500} from 'material-ui/styles/colors';
import logo from "../img/logo.png";
import CreateUser from "./FormCreateNewUser";
import ForgotPass from "./ForgotenPasswordByUser";

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

class FormLoginOnStartup extends Component {
    handleClick=()=>{alert("500")}
    state = {
        loggedin: false,
        adduser:false,
        forgotpassword:false,

    }

    updateCheck=()=>{
        this.setState((oldState) => {
            return {
                adduser: true,
            };
        });
    }
    getPassword=()=>{
        this.setState((oldState) => {
            return {
                forgotpassword: !this.state.forgotpassword,
            };
        });
    }

    render() {
        if(this.state.adduser===false&&this.state.forgotpassword===false)
            return (
            <div className="logintop">
                <br/>
                <br/>
                <Paper className="loginpaper" style={style} zDepth={3}>
                    <br/>
                    <div><img style={style.logo} src={logo} /></div>
                    <p className="ptoplogin">Account Login</p>
                    <br/>
                    <br/>
                    <Divider className="insideformdivider" style={style.insideformdivider}/>
                    <div className="insideformdiv">
                        <TextField
                            floatingLabelText="Type your login"
                            floatingLabelStyle={style.floatingLabelStyle}
                            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        />
                    </div>
                    <div className="insideformdiv">
                        <TextField
                            type="password"
                            floatingLabelText="Type your password"
                            floatingLabelStyle={style.floatingLabelStyle}
                            floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                        />
                    </div>

                    <Divider className="insideformdivider" style={style.insideformdivider}/>
                    <br/>
                    <br/>
                    <div className="insideformdiv">
                        <RaisedButton label="Login" fullWidth={true} primary={true} style={style.button}/>
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <Divider className="insideformdivider" style={style.insideformdivider}/>
                        <div className="registersection">
                       <p className="ploginform" onClick={this.getPassword}>Forgot password?</p>
                            <p className="ploginform" onClick={this.updateCheck}>Register new?</p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                </Paper>
                <br/>
            </div>
        );
        else if(this.state.adduser===true) {return(
            <CreateUser
                state={this.state.people}
                updateCheck={this.updateCheck.bind(this)}
            />
        )}
    else if(this.state.forgotpassword===true) {return(
            <ForgotPass
                state={this.state.people}
                getPassword={this.getPassword.bind(this)}
            />
        )};
    }
}

function mapStateToProps(state) {
    return {};
}

export default FormLoginOnStartup;
