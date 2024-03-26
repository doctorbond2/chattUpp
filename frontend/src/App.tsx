import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ActiveUser } from "./types/userTypes";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { LOGGED_OUT } from "./types/userTypes";
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
      <Routes>
        <Route element={<NavBar {...{ loggedIn, setLoggedIn }} />}>
          <Route path="/" element={<Home {...{ loggedIn }} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/login"
            element={<Login {...{ setLoggedIn, loggedIn }} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
