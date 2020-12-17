import { useSelector } from 'react-redux';

function IfAuth({ children }) {
  const token = useSelector((state) => state.auth.accessToken);
  return token ? children : null;
}

export default IfAuth;
