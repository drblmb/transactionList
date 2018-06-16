import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from 'reducers';
import { devMode } from 'constants/environment';

const history = createHistory();

function configureStore() {
  const historyMiddleware = routerMiddleware(history);
  const middleware = [thunk, historyMiddleware];

  if (devMode) {
    // Logger should go last
    const logger = createLogger();
    middleware.push(logger);
  }

  const enhancer = compose(applyMiddleware(...middleware));

  return createStore(rootReducer, enhancer);
}

const store = configureStore();

export default store;

export {
  history,
};
