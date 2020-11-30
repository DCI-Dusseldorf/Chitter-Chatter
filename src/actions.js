import { store } from './redux';

export const updatePosts = async () => {
  const response = await fetch('/api/post/', {
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
    },
  });
  const result = await response.json();
  if (!response.ok) return;
  store.dispatch({ type: 'updatePost', posts: result });
};

export const likePost = async (postId) => {
  const response = await fetch(`/like/post/${postId}/like`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
    },
  });
  console.log(response);
};

export const editPost = async (postId, message) => {
  await fetch(`/api/post/${postId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
    },
    body: JSON.stringify({ message: message }),
  });
  updatePosts();
};

export const deletePost = async (postId) => {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
    },
  });
  updatePosts();
};
