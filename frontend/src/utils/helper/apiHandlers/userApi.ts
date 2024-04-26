import { user } from '../../axiosInstanceConfig';
import localStorageKit from '../localstorageKit';

const {
  VITE_user_route_CREATE,
  VITE_user_route_ID_PROFILE,
  VITE_user_route_LIST,
  VITE_user_route_UPDATE_ONE_ID,
  VITE_auth_route_REFRESH_TOKEN,
} = import.meta.env;
class UserAPIKit {
  constructor() {}
  async getUserInfo() {
    try {
      const response = await user.get(VITE_user_route_ID_PROFILE);
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      console.error(err.message);
    }
  }
}
const UserAPI = new UserAPIKit();
export default UserAPI;
