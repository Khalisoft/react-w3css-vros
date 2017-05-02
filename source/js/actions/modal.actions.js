import {CLOSE_MODAL, OPEN_MODAL} from './action.types';

export function closeModal() {
    return (dispatch) => {
        dispatch({
            type: CLOSE_MODAL,
            payload: {
                isOpen: false,
                item: null
            }
        });
    };
};

export const openModal = (payload) => {
    return (dispatch) => {
        dispatch({
            type: OPEN_MODAL,
            payload: payload
        });
    };
};