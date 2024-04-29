import { useContext, createContext, useState, ReactNode } from 'react';
import { ActiveUser } from '../../types/userTypes';
import { AuthUser, defaultAuthUser } from '../../types/authTypes';
import AuthAPI from '../helper/apiHandlers/authApi';
import { LOGGED_OUT } from '../../types/userTypes';
import localStorageKit from '../helper/localstorageKit';
const AuthContext = createContext<AuthUser>(defaultAuthUser);
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

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
