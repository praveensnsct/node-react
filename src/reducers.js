/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './redux/user/reducer';
/**
 * Creates the main reducer with the dynamically injected ones
 */

export default function createReducer(injectedReducers = {}, history = null) {
  return combineReducers({
    router: connectRouter(history),
    user: userReducer,
    ...injectedReducers,
  });
}
