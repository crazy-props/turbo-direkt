import {auth} from "../firebase";

const LOGIN = "authState/LOGIN";
const LOGOUT = "authState/LOGOUT"
const INTERNAL_ERROR = 'authState/INTERNAL_ERROR'
const EXTERNAL_ERROR = 'authState/EXTERNAL_ERROR'

const defaultState = {
    isLoggedIn: false,
    user: null,
    error: '',
    imWithError: false
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                error: '',
                imWithError: false,
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                error: '',
                imWithError: false
            }
        case INTERNAL_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                error: action.error,
                imWithError: true
            }
        case EXTERNAL_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                error: action.error.message,
                imWithError: true
            }

        default:
            return state;
    }
};
const handleInternalError = (error) => ({type: INTERNAL_ERROR, error})
const handleExternalError = (error) => ({type: EXTERNAL_ERROR, error})

export const loginUser = (user) => {
    return {
        type: LOGIN,
        user
    }
};

export const logoutUser = () => {
    return {
        type: LOGOUT
    }
};

export const logOut = () => (dispatch, getState) => {
    auth.signOut()
};
export const initAuthUserSync = () => (dispatch, getState) => {
    auth.onAuthStateChanged(
        user => {
            if (user) {
                dispatch(loginUser(user))
            } else {
                dispatch(logoutUser())
            }
        }
    )
}
export const logInByMailAndPass = (email, password) => (dispatch, getState) => {
    if (!password) {
        dispatch(handleInternalError('Password is required'))
    } else if (!email) {
        dispatch(handleInternalError('Email is required'))
    } else {
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => dispatch(handleExternalError(error)))
    }
}
