import { store } from '../../store';

const { dispatch } = store;

export const getUser = (userId) => {
  fetch(`/api/user/${userId}`, {
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
  })
    .then((response) => {
      if (response.code === 400) return;
      return response.json();
    })
    .then((userInfo) => {
      dispatch({ type: 'user', user: userInfo });
    });
};

export const getUserPostsOnly = (userId) => {
  console.log(userId);
  fetch(`/api/user/${userId}/mine`, {
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
  }).then((response) =>
    dispatch({ type: 'user:posts:only', posts: response.data, userId })
  );
};
