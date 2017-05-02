import {OPEN_MODAL, CLOSE_MODAL} from '../actions/action.types';

const defaultState = {
    isOpen: false,
    item: null,
    modalFor: null,
    galleryType: null
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case OPEN_MODAL:
            return {...state, ...action.payload};
        case CLOSE_MODAL:
            return action.payload;
        default:
            return state;
    }
}