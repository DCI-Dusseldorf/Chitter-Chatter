import Axios from 'axios';

const defaulttokens = {
  accessToken: localStorage.getItem('access-token') || false,
  refreshToken: localStorage.getItem('refresh-token') || false,
  user: JSON.parse(localStorage.getItem('myUser')) || {},
  posts: [],
  search: {},
  friends: [],
  friendsRequest: [],
  friendsRequestSent: [],
};
if (defaulttokens.accessToken)
  Axios.defaults.headers.common.Authorization = defaulttokens.accessToken;
export const auth = (state = defaulttokens, action) => {
  const {
    accessToken,
    refreshToken,
    user,
    posts,
    model,
    field,
    match,
    list,
    avatar,
    friends,
    friendsRequest,
    friendsRequestSent,
  } = action;
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
    case 'search:change':
      return { ...state, search: { model, field, match } };
    case 'search:results':
      return { ...state, search: { list, model, field, match } };
    case 'user:avatar':
      return { ...state, user: { ...state.user, avatar } };
    case 'friends:Profiles':
      return { ...state, friends: friends };
    case 'friendsRequest:Profile':
      return { ...state, friendsRequest: friendsRequest };
    case 'friendsRequestSent:Profile':
      return { ...state, friendsRequestSent: friendsRequestSent };
    default:
      return state;
  }
};
