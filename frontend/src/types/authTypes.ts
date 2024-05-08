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
  setProfileData: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  fetchUserProfile: () => Promise<void>;
}
export const defaultAuthUser = {
  loggedIn: LOGGED_OUT,
  login: async () => {},
  logout: () => {},
  setLoggedIn: () => {},
  profileData: defaultProfileInfo,
  setProfileData: () => {},
  fetchUserProfile: async () => {},
};
export interface TwoTokens {
  access: string;
  refresh: string;
}
export interface AdminTokens extends TwoTokens {
  adminToken: string;
}
