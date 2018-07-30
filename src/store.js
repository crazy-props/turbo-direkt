import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import turboState, {initTurbo} from './state/turboState'
import carsState, {initCars} from './state/carsState'
import partsState, {myInit} from './state/partsState'
import createUser from './state/createUser'
import forgotPassword from './state/forgotPassword'


export const reducer = combineReducers({
    turboState,
    createUser,
    forgotPassword
    carsState,
    partsState
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
