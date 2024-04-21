import { ActiveUser, LOGGED_OUT } from "./userTypes";

export interface AuthUser {
  loggedIn: ActiveUser;
  login: (loginData: any) => Promise<void>;
  logout: () => void;
  setLoggedIn: React.Dispatch<React.SetStateAction<ActiveUser>>;
}
export const defaultAuthUser = {
  loggedIn: LOGGED_OUT,
  login: async () => {},
  logout: () => {},
  setLoggedIn: () => {},
};
export interface TwoTokens {
  access: string;
  refresh: string;
}
