import {SCREEN_SIZE_CHANGE, SCREEN_HEIGHT_CHANGE} from './action.types';

/**
 * 
 * 
 * @export
 * @param {object} screenSize 
 * @returns function that dispaction an action
 */
export function screenSizeChange(screenSize) {
    return (dispatch) => {
        dispatch({
            type: SCREEN_SIZE_CHANGE,
            payload: screenSize
        });
    };
};

/**
 * Dispatching action of type SCREEN_HEIGHT_CHANGE
 * 
 * @export
 * @param {number} screenHeight 
 * @returns function
 */
export function screenHeightChange(screenHeight) {
    return (dispatch) => {
        dispatch({
            type: SCREEN_HEIGHT_CHANGE,
            payload: screenHeight
        });
    };
};