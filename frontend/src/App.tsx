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
import { ChatProvider } from './utils/hooks/ChatContext';
import ChatPage from './pages/ChatPage';
import TestAndTry from './pages/TestAndTry';
function App() {
  return (
    <>
      <AuthProvider>
        <ChatProvider>
          {
            <Routes>
              <Route element={<NavBar />}>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="test" element={<TestAndTry />} />
              </Route>
            </Routes>
          }
        </ChatProvider>
      </AuthProvider>
    </>
  );
}

export default App;
