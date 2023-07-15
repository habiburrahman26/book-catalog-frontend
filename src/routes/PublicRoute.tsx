import { ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

type PropsType = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PropsType) => {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicRoute;
