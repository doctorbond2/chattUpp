import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { ActiveUser } from '../../types/userTypes';
import { AuthUser, defaultAuthUser } from '../../types/authTypes';
import {
  LOGIN_request,
  START_request,
  REFRESH_request,
} from '../requestHelpers';
import AuthAPI from '../helper/apiHandlers/authApi';
import { LOGGED_OUT } from '../../types/userTypes';
const AuthContext = createContext<AuthUser>(defaultAuthUser);
import localStorageKit from '../helper/localstorageKit';
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
        const response = await AuthAPI.loginRequest(loginData);
        console.log('RESPONSE', response);
        if (response) {
          if (response.adminToken) {
            setLoggedIn(response);
            console.log('LOGIN SUCCESS: Logged in as ADMIN');
          } else {
            setLoggedIn(response);
            console.log('LOGIN SUCCESS: Logged in as standard user');
          }
        }
      } catch (err: any) {
        console.error('Invalid logindata: ', err.message);
      }
    }
  };
  // const checkTokens = async () => {
  //   try {
  //     await AuthAPI.refreshVerifyTokens();
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {}, []);
  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
