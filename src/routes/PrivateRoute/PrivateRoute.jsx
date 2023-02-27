import { Navigate } from 'react-router-dom';

import { getIsLogin, getIsRefreshing } from 'redux/auth/auth-selector';
import { useSelector } from 'react-redux';

export default function PrivateRoute({
  component: Component,
  redirectTo = '/',
}) {
  const isLogin = useSelector(getIsLogin);
  const isRefreshing = useSelector(getIsRefreshing);

  const shouldRedirect = !isRefreshing && !isLogin;
  
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
}
