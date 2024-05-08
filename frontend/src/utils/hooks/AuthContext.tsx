import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { ActiveUser } from '../../types/userTypes';
import { AuthUser, defaultAuthUser } from '../../types/authTypes';
import AuthAPI from '../helper/apiHandlers/authApi';
import { LOGGED_OUT } from '../../types/userTypes';
import localStorageKit from '../helper/localstorageKit';
const AuthContext = createContext<AuthUser>(defaultAuthUser);
export const useAuth = () => useContext(AuthContext);
import UserAPI from '../helper/apiHandlers/userApi';
import { defaultProfileInfo } from '../../types/userTypes';
import { ProfileInfo } from '../../types/userTypes';
import { useNavigate } from 'react-router-dom';
type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<ActiveUser>(
    localStorageKit.getTokensFromStorage() || LOGGED_OUT
  );
  const [profileData, setProfileData] =
    useState<ProfileInfo>(defaultProfileInfo);
  //FIXA LOGOUT TOKEN BLACKLIST
  const logout = async () => {
    localStorageKit.deleteTokenFromStorage();
    setLoggedIn(LOGGED_OUT);
    window.location.reload();
  };
  const login = async (loginData: any) => {
    if (loginData) {
      try {
        const response = await AuthAPI.loginRequest(loginData);
        if (response) {
          if (response.adminToken) {
            setLoggedIn(response);
          } else {
            setLoggedIn(response);
          }
          navigate('/');
        }
      } catch (err: any) {
        console.error('Invalid logindata: ', err.message);
      }
    }
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await UserAPI.getUserDetails();
        if (response) {
          setProfileData(response.data);
        }
      } catch (err: any) {
        console.log('ERROR SETTING PROFILE', err.message);
      }
    };
    if (loggedIn.access) {
      fetchProfileData();
    }
  }, [loggedIn]);
  async function fetchUserProfile() {
    try {
      const response = await UserAPI.getUserDetails();
      if (response) {
        setProfileData(response.data);
      }
    } catch (err: any) {
      console.log('ERROR SETTING PROFILE', err.message);
    }
  }
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
        logout,
        setLoggedIn,
        profileData,
        setProfileData,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
