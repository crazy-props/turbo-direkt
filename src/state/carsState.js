import { db } from '../firebase'
import { mapObjectToArray } from '../utils'


const SET_CARS = 'exampleState/SET_CARS'

export const set = (carsValue) => ({
    type: SET_CARS,
    carsValue
})

export const initCars = () => (dispatch, getState) => {
    db.ref(`/car_model/`).on(
        'value',
        (snapshot) => {
            (dispatch(
                set(mapObjectToArray(snapshot.val()))
            ))
        }
    )
}

const initialState = {
    cars: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_CARS:
            const carsObject = action.carsValue
            return {
                ...state,
                cars: carsObject
            }
        default:
            return state
    }
}