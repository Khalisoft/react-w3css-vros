import {DRAGGING_INDEX, NEW_IMAGES_LIST} from '../actions/action.types';

const defaultState = {
    draggingIndex: null,
    images: null
};

export default function(state = defaultState, action) {
    switch(action.type) {
        case DRAGGING_INDEX:
            return {...state, draggingIndex: action.payload.draggingIndex};
        case NEW_IMAGES_LIST:
            return {...state, images: action.payload.images};
        default:
            return state;
    }
}