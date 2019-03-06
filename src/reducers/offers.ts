import * as actions from '../actions/offers'

const offersState = {
    items: [],
    selectedData: {},
    loading: false,
    fetchError: ''
}

export default (state = offersState, action) => {
    const { type, items, error } = action

    switch (type) {
        case actions.SET_OFFERS:
            return {
                ...state,
                items,
                fetchError: null,
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
        case actions.SET_REQUEST_ERROR:
            return {
                ...state,
                fetchError: error,
                loading: action.status
            }
        default:
            return state
    }
};