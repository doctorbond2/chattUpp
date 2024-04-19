import { ActiveUser, LOGGED_OUT } from "./userTypes";

export interface AuthUser {
  loggedIn: ActiveUser;
  login: (loginData: any) => Promise<void>;
  logout: () => void;
}
export const defaultAuthUser = {
  loggedIn: LOGGED_OUT,
  login: async () => {},
  logout: () => {},
};
export interface TwoTokens {
  access: string;
  refresh: string;
}
