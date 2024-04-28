import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NAV/NavBar';
import { Navigate } from 'react-router-dom';
import Register from './pages/subpages/Register';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import { useAuth } from './utils/hooks/AuthContext';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './utils/hooks/AuthContext';
import ChatRoom from './pages/ChatRoom';
import ChatPage from './pages/ChatPage';
import { useEffect } from 'react';
function App() {
  const { loggedIn } = useAuth();
  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);
  return (
    <>
      <AuthProvider>
        {loggedIn && (
          <Routes>
            <Route element={<NavBar />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Route>
          </Routes>
        )}
      </AuthProvider>
    </>
  );
}

export default App;
