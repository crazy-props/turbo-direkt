import { db } from "../firebase";
import { mapObjectToArray } from "../utils";

const GET_PARTS = "partsState/GET_PARTS"
const SEARCH_PARTS = "partsState/SEARCH_PARTS"

export const getParts = (parts) => ({
    type: GET_PARTS,
    parts
})
export const searchParts = (search) => ({
    type: SEARCH_PARTS,
    search
})

export const myInit = () => (dispatch, getState) => {
    db.ref(`/parts/`).on(
        'value',
        (snapshot) => (dispatch(getParts(mapObjectToArray(snapshot.val())))))
}

export const newPart = (partsName, partsGroup) => (dispatch, getState) => {
    const newPart = { amount: 0, group: partsGroup, part: partsName }
    db.ref('/parts/').push(newPart)
}

export const addAmount = (objecter, objectsGroup) => (dispatch, getState) => {
    let findKey = getState().partsState.parts.find(x => {
        if ((x.part === objecter)&& (x.group === objectsGroup))
            return x.key
    })
    let xAmount

    getState().partsState.parts.find(x => {
        if ((x.part === objecter) && (x.group === objectsGroup))
            return xAmount = x.amount
    })
    db.ref(`/parts/${findKey.key}/amount`).set(xAmount + 1)
}

export const subtractAmount = (objecter, objectsGroup) => (dispatch, getState) => {
    let findKey = getState().partsState.parts.find(x => {
        if ((x.part === objecter)&& (x.group === objectsGroup))
            return x.key
    })
    let xAmount
    getState().partsState.parts.find(x => {
        if ((x.part === objecter) && (x.amount > 0) && (x.group === objectsGroup))
            return xAmount = x.amount-1
        else return xAmount = 0

    })
        return db.ref(`/parts/${findKey.key}/amount`).set(xAmount)
}

const initialState = {
    parts: [],
    search: '',

}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS :
            return {
                ...state,
                parts: action.parts,
            }
        case SEARCH_PARTS :

            return {
                ...state,
                search: action.search,
            }
        default:
            return state
    }
}