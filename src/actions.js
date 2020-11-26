import { store } from './redux';
export const updatePosts = async (token) => {
  const response = await fetch('/api/post/', {
    headers: {
      'content-type': 'application/json',
      Authorization: token,
    },
  });
  const result = await response.json();
  console.log(result);
  if (!response.ok) return;
  store.dispatch({ type: 'updatePost', posts: result });
};
