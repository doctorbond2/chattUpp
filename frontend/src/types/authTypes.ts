import {
  ActiveUser,
  LOGGED_OUT,
  ProfileInfo,
  defaultProfileInfo,
} from './userTypes';

export interface AuthUser {
  loggedIn: ActiveUser;
  login: (loginData: any) => Promise<void>;
  logout: () => void;
  setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
  profileData: ProfileInfo;
}
export const defaultAuthUser = {
  loggedIn: LOGGED_OUT,
  login: async () => {},
  logout: () => {},
  setLoggedIn: () => {},
  profileData: defaultProfileInfo,
};
export interface TwoTokens {
  access: string;
  refresh: string;
}
export interface AdminTokens extends TwoTokens {
  adminToken: string;
}
