/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import invariant from 'invariant';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';

import createReducer from './reducers';
import checkStore from './utils/checkStore';


export default function configureStore(initialState = {}, history) {
  // Create the store with two middlewares
  // 1. thunk: for async/await support in action creators
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [thunk, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const store = createStore(
    createReducer({}, history),
    initialState,
    composeEnhancers(...enhancers),
  );
  store.injectedReducers = {};
  store.injectReducer = (key, reducer) => {
    checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading
    // when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    )
      return;

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers, history));
  };

  // Make reducers hot reloadable
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers, history));
    });
  }

  return store;
}
