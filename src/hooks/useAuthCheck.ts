import { useState, useEffect } from 'react';
import { useAppDispatch } from '../redux/hook';
import { userLoggedIn } from '../redux/features/auth/authSlice';

const useAuthCheck = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticate(true);
      dispatch(userLoggedIn(accessToken));
    } else {
      setIsAuthenticate(false);
    }
  }, [dispatch]);

  return isAuthenticate;
};

export default useAuthCheck;
