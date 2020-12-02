const { createStore } = require('redux');

const defaulttokens = {
  accessToken: localStorage.getItem('access-token') || false,
  refreshToken: localStorage.getItem('refresh-token') || false,
  user: '',
  posts: [],
  search: {},
};

const reducer = (state = defaulttokens, action) => {
  const {
    accessToken,
    refreshToken,
    user,
    posts,
    model,
    field,
    match,
    list,
  } = action;
  switch (action.type) {
    case 'Login':
    case 'Register':
      return {
        ...state,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      };
    case 'Logout':
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      console.log(state, action);
      return {
        ...state,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    case 'updatePost':
      return {
        ...state,
        posts: posts,
      };
    case 'search:change':
      return { ...state, search: { model, field, match } };
    case 'search:results':
      return { ...state, search: { list, model, field, match } };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//on refresh to remain login
store.subscribe(() => {
  const state = store.getState();
  if (
    // typeof localStorage['access-token'] === 'undefined' ||
    localStorage['access-token'] === state.accessToken
  )
    return;
  localStorage.setItem('access-token', state.accessToken);
  localStorage.setItem('refresh-token', state.refreshToken);
});
