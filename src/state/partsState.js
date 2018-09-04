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
        (snapshot) => dispatch(getParts(mapObjectToArray(snapshot.val()))))
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
            return xAmount = x.amount-1
            else return xAmount = 0
    })
        return db.ref(`/parts/${findKey.key}/amount`).set(xAmount)
}

const initialState = {
    parts: [],
    actuators: [],
    back_plates: [],
    bearing_housings: [],
    compressor_wheels: [],
    gasket_kits: [],
    heat_shields: [],
    KODE_CHRAs: [],
    nozzles: [],
    repair_kits: [],
    turbine_wheels: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS :
            return {
                ...state,
                parts: action.parts,
                actuators: action.parts.filter(el => el.group ==="actuator"),
                back_plates: action.parts.filter(el => el.group ==="back_plate"),
                bearing_housings: action.parts.filter(el => el.group === "bearing_housing"),
                compressor_wheels: action.parts.filter(el => el.group === "compressor_wheel"),
                gasket_kist: action.parts.filter(el => el.group === "gasket_kit"),
                heat_shields: action.parts.filter(el => el.group === "heat_shield"),
                KODE_CHRAs: action.parts.filter(el => el.group === "KODE_CHRA"),
                nozzles: action.parts.filter(el => el.group === "nozzle"),
                repair_kits: action.parts.filter(el => el.group === "repair_kit"),
                turbine_wheels: action.parts.filter(el => el.group === "turbine_wheel")
            }
        default:
            return state
    }
}