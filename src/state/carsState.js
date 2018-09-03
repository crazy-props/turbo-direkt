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
export const removeCarFromList = (el) => (dispatch, getState) => {
        db.ref(`/car_model/${el.key}`).remove()
            .then(function() {
                console.log("Delete succeeded.")
            })
            .catch(function(error) {
        console.log("Delete failed: " + error.message)
    });
}
const initialState = {
    cars: null
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