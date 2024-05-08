import { user, client } from '../../axiosInstanceConfig';
const {
  VITE_user_route_LIST,
  VITE_user_route_PROFILE_DETAILS,
  VITE_conv_route_GET_LIST,
  VITE_user_route_ADD_FRIEND,
  VITE_user_route_DELETE_FRIEND,
} = import.meta.env;
class UserAPIKit {
  constructor() {}
  async getUserInfo() {
    try {
      const response = await user.get(VITE_user_route_PROFILE_DETAILS);
      return response;
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  }
  async getUserDetails() {
    try {
      const response = await user.get(VITE_user_route_PROFILE_DETAILS);
      return response;
    } catch (err: any) {
      throw err;
    }
  }
  async getUserConversations() {
    try {
      const response = await user.get(VITE_conv_route_GET_LIST);
      return response;
    } catch (err: any) {
      throw err;
    }
  }
  async addNewFriend(friendId: string) {
    if (friendId) {
      try {
        const response = await user.post(VITE_user_route_ADD_FRIEND, {
          friendId,
        });
        if (response) {
          console.log(response);
          return response;
        }
      } catch (err) {
        throw err;
      }
    }
  }
  async removeFriend(friendId: string) {
    if (friendId) {
      try {
        const response = await user.post(VITE_user_route_DELETE_FRIEND, {
          friendId,
        });
        if (response) {
          console.log(response);
          return response;
        }
      } catch (err) {
        throw err;
      }
    }
  }
  async getUserList() {
    try {
      const response = await client.get(VITE_user_route_LIST);
      if (response) {
        return response;
      }
    } catch (err) {
      throw err;
    }
  }
}
const UserAPI = new UserAPIKit();
export default UserAPI;
