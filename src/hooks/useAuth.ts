import { useAppSelector } from '../redux/hook';

export default function useAuth() {
  const auth = useAppSelector((state) => state.auth);

  if (auth?.accessToken) {
    return true;
  } else {
    return false;
  }
}
