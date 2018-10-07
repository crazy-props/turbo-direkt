import React, {Component} from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500, blue500} from 'material-ui/styles/colors';
import logo from "../../img/logo.png";
import CreateUser from "./FormCreateNewUser";
import ForgotPass from "./ForgotenPasswordByUser";
import {logInByMailAndPass} from '../../state/authState';
import {connect} from 'react-redux';
import {Snackbar} from "material-ui";
import {newPart} from "../../state/partsState";
import {clearError} from "../../state/alerts";

const style = {
    height: "75%",
    borderRadius: "10px",
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
        backgroundColor: "#b10303",

        borderRadius: 5
    },
    logo: {
        height: "5.5rem",
        width: "5.5rem",
    },

}

class FormLoginOnStartup extends Component {

    state = {

        logInEmail: "",
        logInPassword: '',
        loggedin: false,
        adduser: false,
        forgotpassword: false,


    }

    onLogInEmailChange = (event) => {
        this.setState({logInEmail: event.target.value})}

    onLogInPasswordChange = (event) => {
        this.setState({logInPassword: event.target.value})
    }

    updateCheck = () => {
        this.setState((oldState) => {
            return {
                adduser: true,
            };
        });
    }
    getPassword = () => {
        this.setState((oldState) => {
            return {
                forgotpassword: !this.state.forgotpassword,
            };
        });
    }

    render() {
        if (this.state.adduser === false && this.state.forgotpassword === false)
            return (
                <div className="logintop">
                    <br/>
                    <br/>
                    <Paper className="loginpaper" style={style} zDepth={3}>
                        <br/>
                        <div><img alt={"turbo direct logo"}style={style.logo} src={logo}/></div>
                        <p className="ptoplogin">Logowanie</p>
                        <br/>
                        <br/>
                        <Divider className="insideformdivider" style={style.insideformdivider}/>
                        <div className="insideformdiv">
                            <TextField
                                value={this.state.value}
                                name={'email'}
                                type={'email'}
                                floatingLabelText="Wpisz email"
                                floatingLabelStyle={style.floatingLabelStyle}
                                floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                                onChange={this.onLogInEmailChange}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter') {
                                        this.props.logInByEmailAndPassword(this.state.logInEmail, this.state.logInPassword)
                                    }
                                }}
                            />
                        </div>
                        <div className="insideformdiv">
                            <TextField
                                value={this.state.value}
                                type={'password'}
                                name={"password"}
                                floatingLabelText="Wpisz hasło"
                                floatingLabelStyle={style.floatingLabelStyle}
                                floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                                onChange={this.onLogInPasswordChange}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter') {
                                        this.props.logInByEmailAndPassword(this.state.logInEmail, this.state.logInPassword)
                                    }
                                }}
                            />
                        </div>

                        <Divider className="insideformdivider" style={style.insideformdivider}/>
                        <br/>
                        <br/>
                        <div className="insideformdiv">
                            <RaisedButton label="Zaloguj" fullWidth={true} primary={true} buttonStyle={style.button}
                                          onClick={() => this.props.logInByEmailAndPassword(this.state.logInEmail, this.state.logInPassword)}

                            />
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <Divider className="insideformdivider" style={style.insideformdivider}/>
                            <div className="registersection">
                                <p className="ploginform" onClick={this.getPassword}>Zapomniałeś hasła?</p>
                                <p className="ploginform" onClick={this.updateCheck}>Nowy użytkownik?</p>
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </Paper>
                    <br/>
                    <Snackbar
                        autoHideDuration={4000}
                        open={this.props.imWithAlert}
                        message={this.props.alert}
                        bodyStyle={{textAlign: 'center'}}
                        onRequestClose={this.props.clearError}
                    />
                </div>
            );
        else if (this.state.adduser === true) {
            return (
                <CreateUser
                    state={this.state.loggedin}
                    updateCheck={this.updateCheck.bind(this)}
                />
            )
        }
        else if (this.state.forgotpassword === true) {
            return (
                <ForgotPass
                    state={this.state.loggedin}
                    getPassword={this.getPassword.bind(this)}
                />
            )
        }
        ;
    }
}

const mapStateToProps = state => ({
    parts: state.partsState.parts,
    alert: state.alerts.alert,
    imWithAlert: state.alerts.imWithAlert
})

const mapDispatchToProps = dispatch => ({

    logInByEmailAndPassword: (email, password) => dispatch(logInByMailAndPass(email, password)),
    clearError: () => dispatch(clearError()),

})

export default connect(mapStateToProps, mapDispatchToProps)(FormLoginOnStartup);

