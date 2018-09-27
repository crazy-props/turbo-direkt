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
export const addCarToList = (objecttodb) => (dispatch, getState) => {
        db.ref(`/car_model/`).push(objecttodb)
            .then(()=>
                console.log("Add succeeded.")
            )
            .catch((error)=>
        console.log(error.message)
    );
}
export const addProductToShoppingList = (partsName) => (dispatch, getState) => {
    if (getState().shoppingListState.product === null) {
        db.ref(`/shoppingList/`).push(partsName)
    } else {
        let checkIfOnTheList = getState().shoppingListState.products.find(x => x.value === partsName)
        if (checkIfOnTheList === undefined) {
            db.ref(`/shoppingList/`).push({value: partsName})
        }
        else {
            console.log("such product is already on the list")
        }
    }

}





export const removeCarFromList = (el) => (dispatch, getState) => {
    db.ref(`/car_model/${el.key}`).remove()
        .then(()=>
            console.log("Delete succeeded.")
        )
        .catch((error)=>
            console.log("Delete failed: " + error.message)
        );
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