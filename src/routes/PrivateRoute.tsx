import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactNode } from 'react';

type PropsType = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PropsType) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
