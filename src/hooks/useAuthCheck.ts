import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import { userLoggedIn } from "../redux/features/auth/authSlice";

const useAuthCheck = () => {
  const [authChecked, setIsAuthChecked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(userLoggedIn(accessToken));
    }

    setIsAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};

export default useAuthCheck;
