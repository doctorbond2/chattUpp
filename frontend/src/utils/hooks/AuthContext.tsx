import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ActiveUser } from "../../types/userTypes";
import { AuthUser, defaultAuthUser } from "../../types/authTypes";
import {
  LOGIN_request,
  START_request,
  REFRESH_request,
} from "../requestHelpers";
import { LOGGED_OUT } from "../../types/userTypes";
const AuthContext = createContext<AuthUser>(defaultAuthUser);
import localStorageKit from "../helper/localstorageKit";
export const useAuth = () => useContext(AuthContext);
type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState<ActiveUser>(
    localStorageKit.getTokensFromStorage() || LOGGED_OUT
  );
  //FIXA LOGOUT TOKEN BLACKLIST
  const logout = async () => {
    localStorageKit.deleteTokenFromStorage();
    setLoggedIn(LOGGED_OUT);
  };
  const login = async (loginData: any) => {
    if (loginData) {
      try {
        const response: any = await LOGIN_request("/auth/login", loginData);

        console.log("RESPONSE", response);
        if (response) {
          localStorageKit.setTokenInStorage(response);
          if (response?.adminToken) {
            setLoggedIn(response);
            console.log("LOGIN SUCCESS: Logged in as ADMIN");
          } else {
            setLoggedIn(response);
            console.log("LOGIN SUCCESS: Logged in as standard user");
          }
        }
      } catch (err: any) {
        console.error("Invalid logindata: ", err.message);
      }
    }
  };
  useEffect(() => {
    console.log("STATUS", loggedIn);
  }, [loggedIn]);
  useEffect(() => {
    if (loggedIn.access === null) {
      const tokens = localStorageKit.getTokensFromStorage();
      console.log("LOCAL STORAGE TOKENS:", tokens);
      const checkTokens = async () => {
        try {
          console.log("checking Accesstoken!");
          const response = await START_request();
          if (response) {
            console.log("good stuf!");
            setLoggedIn(tokens);
          }
        } catch (err: any) {
          try {
            const refreshResponse = await REFRESH_request(
              "auth/refresh/token",
              {
                refresh: tokens.refresh,
              }
            );
            localStorageKit.setTokenInStorage(refreshResponse);
            console.log("tokens set in storage. used refreshToken:");
            setLoggedIn(refreshResponse);
          } catch (refreshError: any) {
            console.log("Refresh error:", refreshError.message);
            alert("Please login again!");
            localStorageKit.deleteTokenFromStorage();
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
    <AuthContext.Provider value={{ loggedIn, login, logout, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
