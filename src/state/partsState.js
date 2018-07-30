import {db} from "../firebase";
import {mapObjectToArray} from "../utils";

const GET_PARTS = "partsState/GET_PARTS"

export const getParts = (parts) => ({
    type: GET_PARTS,
    parts
})

export const myInit = () => (dispatch, getState) => {
    db.ref(`/parts/`).on(
        'value',
        (snapshot) => {
            (dispatch(getParts(mapObjectToArray(snapshot.val())))
            )
        })
}

const initialState = {
    parts: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS :
            return {
                ...state,
                parts: action.parts
            }
        default:
            return state
    }
}