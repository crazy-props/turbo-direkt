import { db } from '../firebase'
import { mapObjectToArray } from "../utils"

const SET_TURBINES = 'turboState/SET_TURBINES';
const DELETE_TURBINES = 'turboState/DELETE_TURBINES';
const CLOSE_SNACK = 'turbineState/CLOSE_SNACKBAR'

export const set = (turboValue) => ({
    type: SET_TURBINES,
    turboValue,
})

export const deleteElem = () => ({
    type: DELETE_TURBINES,
    elem: true,
})

const initialState = {
    turbo: null,
    elem: false,
}
const closeSnack = () => ({
    type: CLOSE_SNACK,
    elem: true,
})

export default (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case SET_TURBINES:
            const turboObject = action.turboValue
            return {
                ...state,
                turbo: turboObject,

            }
        case DELETE_TURBINES:
            return {
                ...state,
                elem: true,
            }
        case CLOSE_SNACK:
            return {
                ...state,
                elem: false
            }
        default:
            return state
    }
}

export const initTurbo = () => (dispatch, getState) => {
    db.ref(`/turbo/`)/*.limitToFirst(100)*/.on(
        'value',
        (snapshot) => {
            (dispatch(set(mapObjectToArray(snapshot.val())))
            )
        })
}
export const removeTurboFromList = (turbine) => (dispatch, getState) => {
    db.ref(`/turbo/${turbine.key}`).remove()
        .then(() =>
            alert(`Delete succeeded. ${turbine.turboOEM}`)
        )
        .catch((error) => {
            dispatch(deleteElem())
            console.log("Delete failed: " + error.message)
        }).then(setTimeout(() => {
            dispatch(closeSnack())
        }, 4000))
}

export const addTurboToList = (objecttodb) => (dispatch, getState) => {
    db.ref(`/turbo/`).push(objecttodb)
        .then(() =>
            console.log("Add succeeded.")
        )
        .catch((error) =>
            console.log(error.message)
        );
}