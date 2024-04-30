import { user } from '../../axiosInstanceConfig';
const { VITE_conv_route_CREATE } = import.meta.env;
class ConvoAPIKit {
  constructor() {}
  async verifyConversation(friendId: string) {
    console.log('Verifying conversation: ', friendId);
    try {
      const response = await user.post(VITE_conv_route_CREATE, { friendId });
      if (response) {
        return response.data._id;
      }
    } catch (err: any) {
      throw err;
    }
  }
}
const convoAPI = new ConvoAPIKit();
export default convoAPI;
