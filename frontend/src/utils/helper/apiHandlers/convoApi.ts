import { user } from '../../axiosInstanceConfig';
const { VITE_conv_route_CREATE, VITE_message_route_CREATE } = import.meta.env;
class ConvoAPIKit {
  constructor() {}
  async verifyConversation(friendId: string) {
    try {
      const response = await user.post(VITE_conv_route_CREATE, { friendId });
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
  async addNewMessage(message: any) {
    try {
      const response = await user.post(VITE_message_route_CREATE, message);
      if (response) {
        // console.log('You got a response from the api:', response);
        return response.data._id;
      }
    } catch (err: any) {
      throw err;
    }
  }
}
const convoAPI = new ConvoAPIKit();
export default convoAPI;
