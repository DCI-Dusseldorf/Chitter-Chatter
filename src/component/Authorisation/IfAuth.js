import React from 'react';
import { useSelector } from 'react-redux';

function IfAuth({ children }) {
  const token = useSelector((state) => state.accessToken);
  return token ? children : null;
}

export default IfAuth;
