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

export const removeProductFromShoppingList = (partsName) => (dispatch, getState) => {
    let findKey = getState().shoppingListState.products.find(x => {
        if (x.value === partsName)
            return x.key
    })
    if (findKey !== undefined) {
        db.ref(`/shoppingList/${findKey.key}`).remove()
    }
    else {
        console.log("there's no such product on shopping list")
    }
}
export const removeMultipleFromShoppingList = (partslist) => (dispatch, getState) => {
    partslist.map(element => {
        let findKey = getState().shoppingListState.products.find(x => {
            if (x.value === element)
                return x.key
        })
        if (findKey !== undefined) {
            db.ref(`/shoppingList/${findKey.key}`).remove()
        }
    })

}


export const addToOrdered = (partsName) => (dispatch, getState) => {
    let findKey = getState().shoppingListState.products.find(x => {
        if (x.value === partsName)
            return x.key
    })
    if (findKey !== undefined) {
        db.ref(`/shoppingList/${findKey.key}`).set({value: partsName, ordered: true})
    }
    else {
        console.log("there's no such product on shopping list")
    }
}


const initialState = {
    products: null,
    ordered: null,
    productsToOrder: null,
}

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_SHOPPING_LIST:
            let list = action.productsToBuy
            let ordered = list.filter(product => {
                if (product.ordered === true){
                    return product
                }
            })
            let toOrder = list.filter(product => {
                if (product.ordered === undefined){
                    return product
                }
            })
            return {
                ...state,
                products: action.productsToBuy,
                ordered: ordered,
                productsToOrder: toOrder
            }
        default:
            return state
    }
}