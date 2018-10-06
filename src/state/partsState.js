import {db} from "../firebase";
import {mapObjectToArray} from "../utils";
import {handleSuccess, handleError} from './alerts'


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
    const newPart = {amount: 0, group: partsGroup, part: partsName}
    db.ref('/parts/').push(newPart)
        .then(() => dispatch(handleSuccess(`Dodano do magazynu: ${partsName}`)))
        .catch(error => dispatch(handleError(error)))
}
export const deletePart = (partsKey) => (dispatch, getState) => {
    db.ref(`/parts/${partsKey.key}`).remove()
        .then(() => dispatch(handleSuccess(`Usunięto z magazynu: ${partsKey.part}`)))
        .catch(error => dispatch(handleError(error)))
}

export const addAmount = (partKey) => (dispatch, getState) => {
    let xAmount
    getState().partsState.parts.find(x => {
        if (x.key === partKey)
            return xAmount = x.amount
    })
    db.ref(`/parts/${partKey}/amount`).set(xAmount + 1)

}

export const subtractAmount = (partKey) => (dispatch, getState) => {
    let xAmount
    getState().partsState.parts.find(x => {
        if ((x.key === partKey) && (x.amount > 0))
            return xAmount = x.amount - 1
        else return xAmount = 0

    })
    return db.ref(`/parts/${partKey}/amount`).set(xAmount)
}

export const addToFavorites = (part) => (dispatch, getState) => {
    let findKey = part.key
    let isFavorite = true
    db.ref(`/parts/${findKey}/isFavorite`).set(isFavorite)
}

export const remToFavorites = (part) => (dispatch, getState) => {
    let findKey = part.key
    let isFavorite = false
    db.ref(`/parts/${findKey}/isFavorite`).set(isFavorite)
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