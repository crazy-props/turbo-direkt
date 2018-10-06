import { db } from '../firebase'
import { mapObjectToArray } from "../utils"
import {handleSuccess, handleError} from './alerts'

const SET_TURBINES = 'exampleState/SET_TURBINES'

export const set = (turboValue) => ({
    type: SET_TURBINES,
    turboValue
})


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
        .then(() => dispatch(handleSuccess(`Usunięto ${turbine.turboOEM}`)))
        .catch(error => dispatch(handleError(error)))
}

export const addTurboToList = (objecttodb) => (dispatch, getState) => {
    db.ref(`/turbo/`).push(objecttodb)
        .then(() => dispatch(handleSuccess(`Dodano ${objecttodb.turboOEM}`)))
        .catch(error => dispatch(handleError(error)))
}

const initialState = {
    turbo: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TURBINES:
            const turboObject = action.turboValue
            return {
                ...state,
                turbo: turboObject
            }
        default:
            return state
    }
}