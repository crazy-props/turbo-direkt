import { db } from "../firebase";
import { mapObjectToArray } from "../utils";

const GET_PARTS = "partsState/GET_PARTS"

export const getParts = (parts) => ({
    type: GET_PARTS,
    parts
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

export const addAmount = (objecter) => (dispatch, getState) => {
    let findKey = getState().partsState.parts.find(x => {
        if (x.part === objecter)
            return x.key
    })
    let xAmount

    getState().partsState.parts.find(x => {
        if (x.part === objecter)
            return xAmount = x.amount
    })
    db.ref(`/parts/${findKey.key}/amount`).set(xAmount + 1)
}

export const subtractAmount = (objecter) => (dispatch, getState) => {
    let findKey = getState().partsState.parts.find(x => {
        if (x.part === objecter)
            return x.key
    })
    let xAmount
    getState().partsState.parts.find(x => {
        if ((x.part === objecter) && (x.amount > 0))
            return xAmount = x.amount - 1
        else return xAmount = 0

    })
    return db.ref(`/parts/${findKey.key}/amount`).set(xAmount)
}

export const addToFavorites = (objecter) => (dispatch, getState) => {
    let findKey = objecter.key
    let isFavorite = true
    db.ref(`/parts/${findKey}/isFavorite`).set(isFavorite)
        .then(console.log(`update success: ${objecter.part} is favorite`))
        .catch(err => console.log("Delete failed: " + err.message))
}

export const remToFavorites = (objecter) => (dispatch, getState) => {
    let findKey = objecter.key
    let isFavorite = false
    db.ref(`/parts/${findKey}/isFavorite`).set(isFavorite)
        .then(console.log(`update success: ${objecter.part} is not favorite`))
        .catch(err => console.log("Delete failed: " + err.message))
}

const initialState = {
    parts: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS:
            return {
                ...state,
                parts: action.parts
            }
        default:
            return state
    }
}