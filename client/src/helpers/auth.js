import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const AuthRoute = () => {
  const location = useLocation();
  const username = cookies.get('Admin') ? cookies.get('Admin')[0] : null;
  if (location.pathname === '/' || location.pathname === '/login') {
    return !cookies.get('Admin') ? <Outlet /> : <Navigate to={'/admin'} />;
  } else {
    return cookies.get('Admin') ? <Outlet /> : <Navigate to="/" />;
  }
};

export default AuthRoute;
