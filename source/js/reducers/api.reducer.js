import {Map} from 'immutable';
import * as types from '../actions/action.types';

const init = Map([]);

export default function(state = init, action) {
    switch(action.type) {
        case types.LOAD_DATA_SUCCESS:
            return state.concat(action.payload);

        case types.LOAD_DATA_UNSUCCESS:
            return action.payload;

        default:
            return state;
    }
};
