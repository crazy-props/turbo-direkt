import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import turboState, {initTurbo} from './state/turboState'
import carsState, {initCars} from './state/carsState'
import partsState, {myInit} from './state/partsState'
import createUser from './state/createUser'
import forgotPassword from './state/forgotPassword'
import shoppingListState, {initList} from './state/shoppingList'


export const reducer = combineReducers({
    turboState,
    createUser,
    forgotPassword,
    carsState,
    partsState,
    shoppingListState
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)


store.dispatch(initTurbo())
store.dispatch(initCars())
store.dispatch(myInit())
store.dispatch(initList())//temporary -> put to shoppingList component when it's ready
