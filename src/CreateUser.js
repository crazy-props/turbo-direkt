import React from 'react'
import {connect} from 'react-redux'
import {addEmail, addPassword, addRetypedPassword, sendUserToDatabase} from "./../src/state/createUser";
import Divider from '@material-ui/core/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red500,blue500} from 'material-ui/styles/colors';
import logo from "./../src/img/logo.png";

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


const CreateUser = (props) => (

    <div className="logintop">
        <br/>
        <br/>
        <Paper className="loginpaper" style={style} zDepth={3}>
            <br/>
            <div><img style={style.logo} src={logo}/></div>
            <p className="ptoplogin">Create new user</p>
            <br/>
            <br/>
            <Divider className="insideformdivider" style={style.insideformdivider}/>
            <div className="insideformdiv">
                <TextField
                    name={"email"}
                    onChange={props.onCreateEmailHandler}
                    floatingLabelText="Type your email"
                    floatingLabelStyle={style.floatingLabelStyle}
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                />
            </div>
            <div className="insideformdiv">
                <TextField
                    onChange={props.onCreatePasswordHandler}
                    type={'password'}
                    name={"password"}
                    floatingLabelText="Type your password"
                    floatingLabelStyle={style.floatingLabelStyle}
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                />
                <TextField
                    onChange={props.onCreateRetypedPasswordHandler}
                    name={"retypedpassword"}
                    type={'password'}
                    floatingLabelText="Retype your password"
                    floatingLabelStyle={style.floatingLabelStyle}
                    floatingLabelFocusStyle={style.floatingLabelFocusStyle}
                />
            </div>

            <Divider className="insideformdivider" style={style.insideformdivider}/>
            <br/>

            <div className="insideformdiv">
                <RaisedButton label="Register" onClick={()=> (props.sendUser(),props.updateCheck())} fullWidth={true} primary={true} style={style.button}/>
            </div>
            <br/>
            <br/>
        </Paper>
        <br/>
    </div>
);

const mapStateToProps = (state) => ({

    email: state.createUser.email,
    warn: state.createUser.warning,
    password: state.createUser.password,
    rpassword: state.createUser.retypedPassword
})

const mapDispatchToProps = (dispatch) => ({

    onCreateEmailHandler: (event, value) => dispatch(addEmail(value)),
    onCreatePasswordHandler: (event, value) => dispatch(addPassword(value)),
    onCreateRetypedPasswordHandler: (event, value) => dispatch(addRetypedPassword(value)),
    sendUser: () => dispatch(sendUserToDatabase())

})


export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)