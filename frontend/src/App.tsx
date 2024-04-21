import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./pages/subpages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { useAuth } from "./utils/hooks/AuthContext";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./utils/hooks/AuthContext";
import { LOGGED_OUT } from "./types/userTypes";
import localStorageKit from "./utils/helper/localstorageKit";
import { REFRESH_request, START_request } from "./utils/requestHelpers";
function App() {
  const { loggedIn, logout } = useAuth();
  useEffect(() => {
    if (loggedIn.access === null) {
      const tokens = localStorageKit.getTokensFromStorage();
      console.log(tokens);
      const checkTokens = async () => {
        try {
          const response = await START_request();
          console.log("RESPONSE:", response);
        } catch (err: any) {
          try {
            const refreshResponse = await REFRESH_request(
              "auth/refresh/token",
              {
                refresh: tokens.refresh,
              }
            );
            localStorageKit.setTokenInStorage(refreshResponse);
          } catch (refreshError: any) {
            console.log(refreshError.message);
            logout();
          }
        }
      };
      if (tokens) {
        checkTokens();
      }
    }
  }, []);
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
