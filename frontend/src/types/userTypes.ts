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
