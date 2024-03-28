export type ActiveUser = {
  access: Boolean;
  admin_access: Boolean;
  id: string | null;
};
export const LOGGED_OUT: ActiveUser = {
  access: false,
  admin_access: false,
  id: null,
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
