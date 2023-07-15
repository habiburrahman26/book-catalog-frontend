import './App.css';
import LoadingSpinner from './components/loder/LoadingSpinner';
import useAuthCheck from './hooks/useAuthCheck';
import MainLayout from './layout/MainLayout';

function App() {
  const isAuthenticate = useAuthCheck();

  return isAuthenticate ? <MainLayout /> : <LoadingSpinner />;
}

export default App;
