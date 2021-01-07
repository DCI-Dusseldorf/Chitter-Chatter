import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserPostsOnly } from './action';

export function useUser(id) {
  useEffect((e) => getUser(id), [id]);
  const user = useSelector((state) => state.cache.user[id]);
  return user || { name: 'User', id };
}

export function useUserPostsOnly(id) {
  useEffect(
    (e) => {
      getUserPostsOnly(id);
    },
    [id]
  );
  const post = useSelector((state) => state.cache.postsOnlyFor[id]);
  return post;
}
