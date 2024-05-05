import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NAV/NavBar';
import Register from './pages/subpages/Register';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './utils/hooks/AuthContext';
import ChatPage from './pages/ChatPage';
import { SocketContextV2Provider } from './utils/hooks/SocketContextV2';
function App() {
  return (
    <>
      <AuthProvider>
        <SocketContextV2Provider>
          {
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
          }
        </SocketContextV2Provider>
      </AuthProvider>
    </>
  );
}

export default App;
