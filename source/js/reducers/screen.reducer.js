import {SCREEN_SIZE_CHANGE, SCREEN_HEIGHT_CHANGE} from '../actions/action.types';

import {getScreenSize} from '../helpers/screen';

const initState = {
    size: getScreenSize(window.innerWidth),
    height: window.innerHeight
 };

/**
 * 
 * 
 * @export
 * @param {string} [state=initState] 
 * @param {object} action 
 * @returns {object} state
 */
export default function(state = initState, action) {
    switch(action.type) {
        case SCREEN_SIZE_CHANGE:
            return {...state, size: action.payload};
        case SCREEN_HEIGHT_CHANGE:
            return {...state, height: action.payload};
        default: 
            return state;
    }
};