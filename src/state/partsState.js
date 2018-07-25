import {db} from '../firebase'
import {mapObjectToArray} from '../utils'

const GET_PARTS = "partsState/GET_PARTS"

export const getParts = (AC) => ({
    type: GET_PARTS,
    AC
})
export const getACParts = () => (getState, dispatch) => {
    const turbines = getState().turboState.turbo
    console.log(turbines)
}


const initialState = {
    AC_part: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS :
            return {
                ...state,
                AC_part: action.AC
            }
        default:
            return state
    }
}