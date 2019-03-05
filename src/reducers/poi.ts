import * as actions from '../actions/poi';

const initialState = {
    poi: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case actions.SET_POI:
            return {
                ...state,
                poi: action.items
            }
        default:
            return state
    }
}