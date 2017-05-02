import { combineReducers } from 'redux';
import api from './api.reducer';
import modal from './modal.reducer';
import {reducer as form} from 'redux-form';
import screen from './screen.reducer';
import auth from './auth.reducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import dd from './dd.reducer';

export default combineReducers({
  api,
  modal,
  form,
  screen,
  auth,
  dd,
  toastr: toastrReducer
});
