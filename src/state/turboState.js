import { db } from '../firebase'
import { mapObjectToArray } from "../utils"

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