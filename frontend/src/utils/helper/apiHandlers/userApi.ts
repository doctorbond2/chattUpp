import { user } from '../../axiosInstanceConfig';
import localStorageKit from '../localstorageKit';

const {
  VITE_user_route_CREATE,
  VITE_user_route_ID_PROFILE,
  VITE_user_route_LIST,
  VITE_user_route_UPDATE_ONE_ID,
  VITE_auth_route_REFRESH_TOKEN,
  VITE_user_route_PROFILE_DETAILS,
} = import.meta.env;
class UserAPIKit {
  constructor() {}
  async getUserInfo() {
    console.log(VITE_user_route_PROFILE_DETAILS);
    try {
      const response = await user.get(VITE_user_route_PROFILE_DETAILS);
      console.log(response.data);
      return response;
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  }
  async getUserDetails() {
    console.log(VITE_user_route_PROFILE_DETAILS);
    try {
      const response = await user.get(VITE_user_route_PROFILE_DETAILS);
      console.log(response.data);
      return response;
    } catch (err: any) {
      throw err;
    }
  }
}
const UserAPI = new UserAPIKit();
export default UserAPI;
