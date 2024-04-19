import { useContext, createContext, useState, ReactNode } from "react";
import { ActiveUser } from "../../types/userTypes";
import { AuthUser, defaultAuthUser } from "../../types/authTypes";
import { POST_request } from "../requestHelpers";
import { LOGGED_OUT } from "../../types/userTypes";
const AuthContext = createContext<AuthUser>(defaultAuthUser);
export const useAuth = () => useContext(AuthContext);
type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState<ActiveUser>(LOGGED_OUT);
  const logout = () => {
    setLoggedIn(LOGGED_OUT);
  };
  const login = async (loginData: any) => {
    if (loginData) {
      try {
        const response = await POST_request("/api/v1/auth/login", loginData);
        if (response) {
          console.log("RESPONSE", response);
          if (response) {
            setLoggedIn({
              access: true,
              admin_access: true,
              token: null,
              refreshToken: null,
            });
            console.log("LOGIN SUCCESS: Logged in as ADMIN");
          } else {
            setLoggedIn({
              access: true,
              admin_access: false,
              token: null,
              refreshToken: null,
            });
            console.log("LOGIN SUCCESS: Logged in as standard user");
          }
        }
      } catch (err: any) {
        console.error("Invalid logindata");
      }
    }
  };
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
