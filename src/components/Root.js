import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Reboot />
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
