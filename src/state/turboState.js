import {db} from '../firebase'

const SET_TURBINES = 'exampleState/SET_TURBINES'

export const set = (turboValue) => ({
    type: SET_TURBINES,
    turboValue
})

export const mapObjectToArray = (obj) => (
    Object.entries(obj || {})
        .map(([key, value]) => (
            typeof value === 'object' ?
                { ...value, key }
                :
                { key, value }
        ))
)

export const initTurbo = () => (dispatch, getState) => {
    db.ref(`/turbo/`).on(
        'value',
        (snapshot) => {
            (dispatch(
                set(mapObjectToArray(snapshot.val()))
            ))
        }
    )
}

const initialState = {
    turbo: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_TURBINES:
            const turboObject = action.turboValue
            return {
                ...state,
                turbo: turboObject[turboObject.length -1]
            }
        default:
            return state
    }
}