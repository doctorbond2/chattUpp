import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./pages/subpages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useAuth } from "./utils/hooks/AuthContext";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./utils/hooks/AuthContext";
function App() {
  const { loggedIn, logout, setLoggedIn } = useAuth();

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<NavBar />}>
            <Route path="/" element={<Home {...{ loggedIn }} />} />
            <Route path="/profile" element={<Profile {...{ loggedIn }} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage {...{ loggedIn }} />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
