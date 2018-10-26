import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import turboState, {initTurbo} from './state/turboState'
import carsState, {initCars,} from './state/carsState'
import partsState, {myInit} from './state/partsState'
import authState, {logInByMailAndPass,initAuthUserSync} from './state/authState'
import createUser from './state/createUser'
import forgotPassword from './state/forgotPassword'
import shoppingListState, {initList} from './state/shoppingList'
import alerts from './state/alerts'


export const reducer = combineReducers({
    turboState,
    createUser,
    authState,
    forgotPassword,
    carsState,
    partsState,
    shoppingListState,
    alerts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.dispatch(logInByMailAndPass())
store.dispatch(initAuthUserSync())
