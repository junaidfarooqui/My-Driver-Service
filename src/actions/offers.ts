const getVehicleByBrand = offers => offers.filter(({ vehicleType }) => vehicleType.brand === 'SIXT limousine service');

export const SET_OFFERS = 'SET_OFFERS';
const setOffers = (items) => ({ type: SET_OFFERS, items });

export const SET_REQUEST_ERROR = 'SET_REQUEST_ERROR';
const setRequestError = (error) => ({ type: SET_REQUEST_ERROR, error });

export const postRequest = data => async dispatch => {
    dispatch(loading(true));

    fetch('http://localhost:2000/api/offers', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            if(!response.length) {
                dispatch(setRequestError('input details are invalid or not filled.'))
            } else {
                const vehiclesByBrand = getVehicleByBrand(response);
                dispatch(setOffers(vehiclesByBrand));
                dispatch(loading(false));
            }
        });
};

export const SAVE_SELECTED_DATA = 'SAVE_SELECTED_DATA';
export const saveSelectedData = data => dispatch => {
    dispatch({
        type: SAVE_SELECTED_DATA,
        data
    })
};

export const LOADING = 'LOADING';
const loading = status => ({ type: LOADING, status })
