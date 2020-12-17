import { cacheReducer } from '../src/component/Data/redux';
import { auth } from './redux';
const { createStore, combineReducers } = require('redux');

export const store = createStore(
  combineReducers({
    auth: auth,
    cache: cacheReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//on refresh to remain login
store.subscribe(() => {
  const state = store.getState();
  if (localStorage['access-token'] === state.auth.accessToken) return;
  localStorage.setItem('access-token', state.auth.accessToken);
  localStorage.setItem('refresh-token', state.auth.refreshToken);
  localStorage.setItem('myUser', JSON.stringify(state.auth.user));
});
