export type ActiveUser = {
  access: Boolean;
  admin_access: Boolean;
  id: string | null;
  token: string | null;
  refreshToken: string | null;
};
export const LOGGED_OUT: ActiveUser = {
  access: false,
  admin_access: false,
  id: null,
  token: null,
  refreshToken: null,
};
export type RegisterFormType = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  repeat_password: string;
};
export const defaultRegisterState: RegisterFormType = {
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  repeat_password: "",
};
export type LoginStateType = {
  password: string;
  username: string;
  email: string;
};
export const defaultLoginState: LoginStateType = {
  password: "",
  username: "",
  email: "",
};
export type ProfileInfo = {
  username: string;
  createdAt: Date;
  email: string;
  firstname: string;
  lastname: string;
  age: number | null;
  role: string;
  avatar: string;
  password: string;
} | null;
export const defaultProfileInfo: ProfileInfo = {
  username: "John",
  createdAt: new Date(),
  email: "John.doe@johndoe@john",
  firstname: "John",
  lastname: "Doe",
  age: null,
  role: "standard",
  avatar: "",
  password: "",
};
