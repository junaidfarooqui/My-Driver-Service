import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import offers from "../reducers/offers"
import poi from "../reducers/poi"

const configureStore = (preloadedState: any) => {
    const combinedReducer = combineReducers({
        offers,
        poi
    });
    return createStore(combinedReducer, preloadedState, applyMiddleware(thunk))
};

export { configureStore }