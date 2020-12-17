import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from './action';

export function useUser(id) {
  console.log(id);
  useEffect((e) => getUser(id), [id]);
  const user = useSelector((state) => state.cache.user[id]);
  console.log(user);
  return user || { name: 'User', id };
}
