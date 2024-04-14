import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ActiveUser } from "./types/userTypes";
import NavBar from "./components/NavBar";
import Register from "./pages/subpages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { LOGGED_OUT } from "./types/userTypes";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./utils/hooks/AuthContext";
function App() {
  const [loggedIn, setLoggedIn] = useState<ActiveUser>(() => {
    const storedLogin = localStorage.getItem("logged_in");
    return storedLogin != undefined ? JSON.parse(storedLogin) : LOGGED_OUT;
  });
  useEffect(() => {
    if (loggedIn.id) {
      localStorage.setItem("logged_in", JSON.stringify(loggedIn));
    } else {
      localStorage.removeItem("logged_in");
    }
  }, [loggedIn]);
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
