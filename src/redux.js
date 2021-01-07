import Axios from 'axios';

const defaulttokens = {
  accessToken: localStorage.getItem('access-token') || false,
  refreshToken: localStorage.getItem('refresh-token') || false,
  user: JSON.parse(localStorage.getItem('myUser')) || {},
  posts: [],
};
if (defaulttokens.accessToken)
  Axios.defaults.headers.common.Authorization = defaulttokens.accessToken;
export const auth = (state = defaulttokens, action) => {
  const { accessToken, refreshToken, user, posts, avatar } = action;
  switch (action.type) {
    case 'Login':
    case 'Register':
      Axios.defaults.headers.common.Authorization = accessToken;

      return {
        ...state,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      };
    case 'Logout':
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      localStorage.removeItem('myUser');
      return {
        ...state,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      };
    case 'updatePost':
      return {
        ...state,
        posts: posts,
      };
    case 'user:avatar':
      return { ...state, user: { ...state.user, avatar } };
    case 'myUser':
      return { ...state, user: action.user };
    default:
      return state;
  }
};
