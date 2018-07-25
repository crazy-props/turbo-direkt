import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import turboState, {initTurbo} from './state/turboState'
import carsState, {initCars} from './state/carsState'
import partsState from './state/partsState'

export const reducer = combineReducers({
    turboState,
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