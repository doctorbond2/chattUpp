import { client, admin, user } from '../../axiosInstanceConfig';
const {
  VITE_auth_route_LOGIN,
  VITE_auth_route_TEST_TEST,
  VITE_auth_route_START_VERIFY_TOKENS,
  VITE_auth_route_REFRESH_TOKEN,
} = import.meta.env;
import { LoginStateType } from '../../../types/userTypes';
import localStorageKit from '../localstorageKit';
import { TwoTokens } from '../../../types/authTypes';
class AuthAPIKit {
  constructor() {}
  async loginRequest(data: LoginStateType) {
    try {
      const response = await client.post(VITE_auth_route_LOGIN, data);
      return response.data;
    } catch (err: any) {
      throw err;
    }
  }
  //FORTSÄTT- - - - - - Undersök vilket steg som kommer efter refresh av sidan.
  async refreshVerifyTokens() {
    try {
      await user.get(VITE_auth_route_START_VERIFY_TOKENS);
    } catch (err: any) {
      console.error(err.message);
    }
  }
  async refreshToken() {
    const tokens = localStorageKit.getTokensFromStorage();
    const refreshToken = tokens?.refresh;
    // console.log('REFRESHTOKEN', refreshToken);
    try {
      const response = await client.post(VITE_auth_route_REFRESH_TOKEN, {
        refresh: refreshToken,
      });
      if (response) {
        // console.log('Set new tokens LOOK HERE');
        localStorageKit.setTokensInStorage(response.data);
      }
    } catch (err: any) {
      console.error(err.message);
      alert('You probably need to login.');
      localStorageKit.deleteTokenFromStorage();
      window.location.reload();
    }
  }
}
const AuthAPI = new AuthAPIKit();
export default AuthAPI;
