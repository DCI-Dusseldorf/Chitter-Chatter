const cacheDefaults = {
  user: {},
  postsOnlyFor: {},
  search: {},
  searchedUserpost: {},
};

export const cacheReducer = (state = cacheDefaults, action) => {
  const { model, field, match, list } = action;
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: { ...state.user, [action.user.id]: action.user },
      };
    case 'user:posts:only':
      return {
        ...state,
        postsOnlyFor: { ...state.postsOnlyFor, [action.userId]: action.posts },
      };
    case 'search:change':
      return { ...state, search: { model, field, match } };
    case 'search:results':
      return { ...state, search: { list, model, field, match } };
    case 'searchedUser:post':
      return {
        ...state,
        searchedUserpost: {
          ...state.searchedUserPost,
          [action.userId]: action.posts,
        },
      };
    case 'users':
      const newUsers = {};
      action.users.forEach((user) => (newUsers[user.id] = user));
      return {
        ...state,
        user: { ...state.user, ...newUsers },
      };

    default:
      return state;
  }
};
