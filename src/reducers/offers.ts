import * as actions from '../actions/offers'

const offersState = {
    items: [],
    selectedData: {},
    loading: false
}

export default (state = offersState, action) => {
    const { type, items } = action

    switch (type) {
        case actions.SET_OFFERS:
            return {
                ...state,
                items,
            }
        case actions.SAVE_SELECTED_DATA:
            return {
                ...state,
                selectedData: {
                    ...state.selectedData,
                    ...action.data
                }
            }
        case actions.LOADING:
            return {
                ...state,
                loading: action.status
            }
        default:
            return state
    }
};