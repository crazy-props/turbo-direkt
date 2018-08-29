import {auth} from "../firebase";

const SENDREQUESTFORPASS = 'forgotPassword/SENDREQUESTFORPASS';
const ADDEMAIL = 'createUser/ADDEMAIL';

export const sendRequestForPass = () => ({
    type: SENDREQUESTFORPASS,

});

export const addEmail = (email) => ({
    type: ADDEMAIL,
    email
});

const initialState = {
    email: "",
};

export default (state = initialState, action) => {

    switch (action.type) {
        case ADDEMAIL:
            return {
                ...state,
                email: action.email
            };
        case SENDREQUESTFORPASS:
            {
                return auth.sendPasswordResetEmail(state.email)
                    .catch(error => {
                        alert(error.message,error.code)

                    })
            }
        default:
            return initialState
    }
}