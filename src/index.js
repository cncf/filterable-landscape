// Set up your application entry point here...
/* eslint-disable import/default */

import process from 'process';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import {loadMainData} from './reducers/mainReducer.js';
import './styles/theme.scss';
import ReactGA from 'react-ga';
require('./favicon.png'); // Tell webpack to load favicon.png
const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);
//Todo: move this to a better place
store.dispatch(loadMainData());

process.env.GA = 'UA-114451006-1';
if (process.env.GA) {
  ReactGA.initialize(process.env.GA);
  ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(function(location) {
    ReactGA.pageview(location.pathname + window.location.search);
  });
}


if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
