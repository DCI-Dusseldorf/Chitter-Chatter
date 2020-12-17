const cacheDefaults = {
  user: {},
  post: {},
  search: {},
};

export const cacheReducer = (state = cacheDefaults, action) => {
  const {} = action;
  console.log(action.user);
  switch (action.type) {
    case 'user':
      return {
        ...state,
        user: { ...state.user, [action.user.id]: action.user },
      };
    default:
      return state;
  }
};
