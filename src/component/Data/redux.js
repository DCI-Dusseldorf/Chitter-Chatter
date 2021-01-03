const cacheDefaults = {
  user: {},
  post: {},
  postsOnlyFor: {},
  search: {},
};

export const cacheReducer = (state = cacheDefaults, action) => {
  const {} = action;
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
    default:
      return state;
  }
};
