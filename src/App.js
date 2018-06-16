import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import minilog from 'minilog';
import { Provider } from 'react-redux';
import { devMode } from 'constants/environment';
import store, { history } from 'store';
import Layout from 'layout/Layout';

// Filter out all but warnings and errors for non-dev environments
if (!devMode) {
  minilog.suggest.defaultResult = false;
  minilog.suggest.clear().allow(/.*/g, 'warn');
}

minilog.enable();

export default function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Provider>
  );
}
