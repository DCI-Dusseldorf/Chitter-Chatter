const { createStore } = require('redux');

const defaulttokens = { accessToken: false, refreshToken: false, user: '' };

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
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
