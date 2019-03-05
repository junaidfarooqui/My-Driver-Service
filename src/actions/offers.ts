const getVehicleByBrand = offers => offers.filter(({ vehicleType }) => vehicleType.brand === 'SIXT limousine service');

export const SET_OFFERS = 'SET_OFFERS';
const setOffers = (items) => ({ type: SET_OFFERS, items });

export const postRequest = data => async dispatch => {
    dispatch(loading(true));
    const responseJson = await fetch('http://localhost:2000/api/offers', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const response = await responseJson.json();
    const vehiclesByBrand = getVehicleByBrand(response);
    dispatch(setOffers(vehiclesByBrand));
    dispatch(loading(false));
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
