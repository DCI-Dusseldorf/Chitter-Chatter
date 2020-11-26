const { createStore } = require('redux');

const defaulttokens = {
  accessToken: localStorage.getItem('access-token') || false,
  refreshToken: localStorage.getItem('refresh-token') || false,
  user: '',
  posts: [],
};

const reducer = (state = defaulttokens, action) => {
  switch (action.type) {
    case 'Login':
    case 'Register':
      console.log(state, action);
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user,
      };
    case 'Logout':
      return;
    case 'updatePost':
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const state = store.getState();
  if (localStorage['access-token'] === state.accessToken) return;
  localStorage.setItem('access-token', state.accessToken);
  localStorage.setItem('refresh-token', state.refreshToken);
});
