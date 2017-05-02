import axios from 'axios';
import * as types from './action.types';

export function getSiteData() {
    return (dispatch) => {
        axios
            .get('http://localhost:3000/api/data')
            .then((response) => {
                dispatch({
                    type: types.LOAD_DATA_SUCCESS,
                    payload: response.data
                });
            })
            .catch((error) => {
                dispatch({
                    type: types.LOAD_DATA_UNSUCCESS,
                    payload: {errMsg: 'Unable to load site data', err: error}
                });
            });
    };
}