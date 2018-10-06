import { db } from '../firebase'
import { mapObjectToArray } from '../utils'
import {handleSuccess, handleError} from './alerts'


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
export const addCarToList = (objecttodb) => (dispatch, getState) => {
        db.ref(`/car_model/`).push(objecttodb)
            .then(() => dispatch(handleSuccess(`Dodano ${objecttodb.mark} ${objecttodb.model}`)))
            .catch(error => dispatch(handleError(error)));
}

export const removeCarFromList = (el) => (dispatch, getState) => {
    db.ref(`/car_model/${el.key}`).remove()
        .then(() => dispatch(handleSuccess(`Usunięto ${el.mark} ${el.model}`)))
        .catch(error => dispatch(handleError(error)));
}

const initialState = {
    cars: null
};
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