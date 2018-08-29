import {db} from "../firebase";
import {mapObjectToArray} from "../utils";

const GET_PARTS = "partsState/GET_PARTS"
const DIVIDE_PARTS = "partsState/DIVIDE_PARTS"
const NEW_PART = "partsState/NEW_PART"

export const getParts = (parts) => ({
    type: GET_PARTS,
    parts
})
export const divideParts = (parts) => ({
    type: DIVIDE_PARTS,
    parts
})


export const myInit = () => (dispatch, getState) => {
    db.ref(`/parts/`).on(
        'value',
        (snapshot) => {
            (dispatch(getParts(mapObjectToArray(snapshot.val()))),
                    dispatch(divideParts(mapObjectToArray(snapshot.val())))
            )
        })
}

export const newPart = (partsName, partsGroup) => (dispatch, getState) => {
    const newPart = {amount: 0, group: partsGroup, part: partsName}
    db.ref('/parts/').push(newPart)
    console.log(newPart)
}

export const findKeyToDelete = (object) => (dispatch, getState) => {
    getState().partsState.parts.find(x => {
        if (x.part === object)
            console.log(x.key)
    })
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
    parts: null,
    actuators: null,
    back_plates: null,
    bearing_housings: null,
    compressor_wheels: null,
    gasket_kits: null,
    heat_shields: null,
    KODE_CHRAs: null,
    nozzles: null,
    repair_kits: null,
    turbine_wheels: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS :
            console.log(action.parts.length)
            return {
                ...state,
                parts: action.parts
            }

        case DIVIDE_PARTS :
            let allParts = action.parts
            let actuator = []
            let back_plate = []
            let bearing_housing = []
            let compressor_wheel = []
            let gasket_kit = []
            let heat_shield = []
            let KODE_CHRA = []
            let nozzle = []
            let repair_kit = []
            let turbine_wheel = []
            allParts.map(part => {
                if (part.group === "actuator") {
                    actuator.push(part)
                }
                if (part.group === "back_plate") {
                    back_plate.push(part)
                }
                if (part.group === "bearing_housing") {
                    bearing_housing.push(part)
                }
                if (part.group === "compressor_wheel") {
                    compressor_wheel.push(part)
                }
                if (part.group === "gasket_kit") {
                    gasket_kit.push(part)
                }
                if (part.group === "heat_shield") {
                    heat_shield.push(part)
                }
                if (part.group === "KODE_CHRA") {
                    KODE_CHRA.push(part)
                }
                if (part.group === "nozzles") {
                    nozzle.push(part)
                }
                if (part.group === "repair_kit") {
                    repair_kit.push(part)
                }
                if (part.group === "turbine_wheel") {
                    turbine_wheel.push(part)
                }

            })
            return {
                ...state,
                actuators: actuator,
                back_plates: back_plate,
                bearing_housings: bearing_housing,
                compressor_wheels: compressor_wheel,
                gasket_kits: gasket_kit,
                heat_shields: heat_shield,
                KODE_CHRAs: KODE_CHRA,
                nozzles: nozzle,
                repair_kits: repair_kit,
                turbine_wheels: turbine_wheel,

            }
        default:
            return state
    }
}