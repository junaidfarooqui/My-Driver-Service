export const SET_POI = 'SET_POI';
const setPoi = (items) => ({ type: SET_POI, items });

export const getPoi = () => async dispatch => {
    const responseJson = await fetch('https://www.mydriver.com/api/v3/pois');
    const response = await responseJson.json();
    dispatch(setPoi(response.data));
}