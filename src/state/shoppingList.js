import {db} from '../firebase'
import {mapObjectToArray} from "../utils";


const GET_SHOPPING_LIST = 'shoppingList/GET_SHOPPING_LIST'

export const getShoppingList = (productsToBuy) => ({
    type: GET_SHOPPING_LIST,
    productsToBuy
})


export const initList = () => (dispatch, getState) => {
    db.ref(`/shoppingList/`).on(
        'value',
        (snapshot) => {
            (dispatch(getShoppingList(mapObjectToArray(snapshot.val())))
            )
        })
}

export const addProductToShoppingList = (partsName) => (dispatch, getState) => {
    let checkIfOnTheList = getState().shoppingListState.products.find(x => x.value === partsName)
    console.log(checkIfOnTheList)
    if(checkIfOnTheList === undefined){
        db.ref(`/shoppingList/`).push(partsName)
    }
    else {console.log("such product is already on the list")}
}

export const removeProductFromShoppingList = (partsName) => (dispatch, getState) => {
    let findKey = getState().shoppingListState.products.find(x => {
        if (x.value === partsName)
            return x.key
    })
    if(findKey !== undefined){
    db.ref(`/shoppingList/${findKey.key}`).remove()
    }
    else{console.log("there's no such product on shopping list")}
}


const initialState = {
    products: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_SHOPPING_LIST:
            return {
                ...state,
                products: action.productsToBuy
            }
        default:
            return state
    }
}