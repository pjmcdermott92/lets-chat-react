import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';
import Header from './components/Header';
import Login from './components/Login';
import SocketProvider from './contexts/SocketProvider';
import Dashboard from './components/Dashboard';
import RoomsProvider from './contexts/RoomsProvider';

const App = () => {
  const { currentUser, logout } = useAuth();

  const dashboard = (
    <SocketProvider id={currentUser?._id}>
      <RoomsProvider>
        <Dashboard />
      </RoomsProvider>
    </SocketProvider>
  );

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={currentUser ? dashboard : <Login />} />
    </Routes>
    </>
  )
}

export default App;
