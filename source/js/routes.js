import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import NotFound from './components/views/NotFound';
import App from './components/views/App';
import PublicIndex from './components/views/PublicIndex';
import AdminIndex from './components/views/AdminIndex';
import {getSiteData} from './actions/api.actions.js';

export default class Routes extends Component {
  render() {
    const {store} = this.props; 
    
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ App } onEnter={store.dispatch(getSiteData())}>
          <IndexRoute component={ PublicIndex } />
          <Route path="/admin" component={ AdminIndex } />
          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
};
