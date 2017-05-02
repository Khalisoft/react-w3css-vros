import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import logger from 'dev/logger';

import rootReducer from 'reducers';
import Routes from 'routes';
import DevTools from 'dev/redux-dev-tools';

import {AUTH_USER} from './actions/action.types';

import ReduxToastr from 'react-redux-toastr';

// Load SCSS
import '../scss/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
export let store = null;

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk);

  store = createStore(
    rootReducer,
    middleware
  );
} else {
  // In development mode beside thunk
  // logger and DevTools are added
  const middleware = applyMiddleware(thunk, logger);
  const enhancer = compose(
    middleware,
    DevTools.instrument()
  );

  store = createStore(
    rootReducer,
    enhancer
  );
}

// get token from localstorage
const token = localStorage.getItem('token');

// if token exist than set authenticated to true
if(token) {
  store.dispatch({type: AUTH_USER});
}

// Render it to DOM
ReactDOM.render(
  <Provider store={ store }>
    { isProduction ?
      <div>
        <Routes store={store}/> 
        <ReduxToastr transitionIn="fadeIn" transitionOut="fadeOut"/>
      </div> :
      <div>
        <Routes store={store}/>
        {/*<DevTools />*/}
        <ReduxToastr transitionIn="fadeIn" transitionOut="fadeOut"/>
      </div> }
  </Provider>,
  document.getElementById('root')
);
