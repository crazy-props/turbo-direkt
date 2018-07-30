import {db} from "../firebase";
import {mapObjectToArray} from "../utils";

const GET_PARTS = "partsState/GET_PARTS"
const DIVIDE_PARTS = "partsState/DIVIDE_PARTS"

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
    turbine_wheels: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PARTS :
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
                turbine_wheels: turbine_wheel
            }
        default:
            return state
    }
}