import './App.css';
import useAuthCheck from './hooks/useAuthCheck';
import MainLayout from './layout/MainLayout';

function App() {
  const isAuthenticate = useAuthCheck();

  return <MainLayout />;
}

export default App;
