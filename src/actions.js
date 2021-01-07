import Axios from 'axios';
import { store } from './store';

export const getmyUser = async () => {
  const { user, accessToken } = store.getState().auth;
  const result = await Axios.get(`/api/user/${user.id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  store.dispatch({ type: 'myUser', user: result.data });
};

export const updatePosts = async () => {
  const { user, accessToken } = store.getState().auth;
  const response = await fetch('/api/post/', {
    headers: {
      'content-type': 'application/json',
      Authorization: accessToken,
    },
  });
  const result = await response.json();
  if (!response.ok) return;
  store.dispatch({ type: 'updatePost', posts: result });
};

export const reactPost = async (postId, reaction) => {
  const response = await fetch(`/api/like/post/${postId}/${reaction}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
  });
  const result = await response.json();
};
export const removeReactPost = async (postId, reaction) => {
  await fetch(`/api/like/post/${postId}/${reaction}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
  });
};

export const commentPost = async (postId, message) => {
  const response = await fetch(`/api/post/${postId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
    body: JSON.stringify({ message: message }),
  });
  const result = await response.json();
  console.log(result);
  updatePosts();
};

export const editPost = async (postId, message) => {
  await fetch(`/api/post/${postId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
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
      Authorization: store.getState().auth.accessToken,
    },
  });
  updatePosts();
};

export const search = async (match, type = 'User', field = 'name') => {
  const response = await fetch(`/api/search/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
    body: JSON.stringify({ match, type, field }),
  });
  const data = await response.json();
  if (response.ok)
    store.dispatch({
      type: 'search:results',
      list: data,
      match,
      model: type,
      field,
    });
};
export const avatarUpload = (e, id) => {
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = async (e) => {
    console.log(e);
    await Axios.patch(`/api/user/${id}`, {
      avatar: e.target.result,
    });
    store.dispatch({
      type: 'user:avatar',
      avatar: e.target.result,
    });
  };
};

export const getUsers = (arrayOfUserIds) => {
  Promise.all(arrayOfUserIds.map((id) => Axios.get(`/api/user/${id}`)))
    .then((arrayOfResponses) =>
      arrayOfResponses.map((response) => response.data)
    )
    .then((arrayOfData) => {
      store.dispatch({ type: 'users', users: arrayOfData });
    });
};

export const removeFriend = async (id) => {
  const response = await fetch(`/api/friends/reject`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  getmyUser();
};

export const addFriend = async (id) => {
  const response = await fetch(`/api/friends/approve`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().auth.accessToken,
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  getmyUser();
};
