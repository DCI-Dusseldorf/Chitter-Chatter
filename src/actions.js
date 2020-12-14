import Axios from 'axios';
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

export const reactPost = async (postId, reaction) => {
  const response = await fetch(`/api/like/post/${postId}/${reaction}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
    },
  });
  const result = await response.json();
};
export const removeReactPost = async (postId, reaction) => {
  await fetch(`/api/like/post/${postId}/${reaction}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
    },
  });
};

export const commentPost = async (postId, message) => {
  const response = await fetch(`/api/post/${postId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
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

export const search = async (match, type = 'User', field = 'name') => {
  const response = await fetch(`/api/search/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: store.getState().accessToken,
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

export const getFriendsProfiles = (arrayOfUserIds) => {
  Promise.all(arrayOfUserIds.map((id) => Axios.get(`/api/user/${id.id}`)))
    .then((arrayOfResponses) =>
      arrayOfResponses.map((response) => response.data)
    )
    .then((arrayOfData) => {
      console.log(arrayOfData);
      store.dispatch({ type: 'friends:Profiles', friends: arrayOfData });
    });
};
