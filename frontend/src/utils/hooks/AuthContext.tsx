import { useContext, createContext, useState, ReactNode } from "react";
import { ActiveUser } from "../../types/userTypes";
import { AuthUser, defaultAuthUser } from "../../types/authTypes";
import { LOGIN_request } from "../requestHelpers";
import { LOGGED_OUT } from "../../types/userTypes";
const AuthContext = createContext<AuthUser>(defaultAuthUser);
import localStorageKit from "../helper/localstorageKit";
export const useAuth = () => useContext(AuthContext);
type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState<ActiveUser>(LOGGED_OUT);
  //FIXA LOGOUT TOKEN BLACKLIST
  const logout = async () => {
    localStorageKit.deleteTokenFromStorage();
    setLoggedIn(LOGGED_OUT);
  };
  const login = async (loginData: any) => {
    if (loginData) {
      try {
        const response: any = await LOGIN_request("/auth/login", loginData);
        if (response) {
          console.log("RESPONSE", response);
          if (response) {
            setLoggedIn({
              access: response.access,
              refresh: response.refresh,
              adminToken: response.admin,
            });
            console.log("LOGIN SUCCESS: Logged in as ADMIN");
          } else {
            setLoggedIn({
              access: response.access,
              refresh: response.refresh,
              adminToken: null,
            });
            console.log("LOGIN SUCCESS: Logged in as standard user");
          }
          localStorageKit.setTokenInStorage(response);
        }
      } catch (err: any) {
        console.error("Invalid logindata", err.message);
      }
    }
  };
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
