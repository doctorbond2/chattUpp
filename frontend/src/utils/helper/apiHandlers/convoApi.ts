import { user } from '../../axiosInstanceConfig';
const {
  VITE_conv_route_CREATE,
  VITE_message_route_CREATE,
  VITE_conv_route_DEACTIVATE,
  VITE_conv_route_ACTIVATE,
  VITE_conv_route_DELETE_ONE_CONVERSATION,
  VITE_conv_route_GET_ONE,
  VITE_conv_route_CREATE_ONE,
  VITE_message_route_GET_LATEST_MESSAGE,
} = import.meta.env;
class ConvoAPIKit {
  constructor() {}
  async getConversation(conversationId: string) {
    console.warn(VITE_conv_route_GET_ONE + conversationId);
    try {
      const response = await user.get(VITE_conv_route_GET_ONE + conversationId);
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
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
        return response.data._id;
      }
    } catch (err: any) {
      throw err;
    }
  }
  async deactiveConvoWithFriend(friendId: string) {
    try {
      const response = await user.put(VITE_conv_route_DEACTIVATE, { friendId });
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
  async activateConvoWithFriend(friendId: string) {
    try {
      const response = await user.put(VITE_conv_route_ACTIVATE, { friendId });
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
  async deleteConvoWithFriend(friendId: string) {
    try {
      const response = await user.delete(
        VITE_conv_route_DELETE_ONE_CONVERSATION + friendId
      );
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
  async createOneNewConversation(friendId: string) {
    try {
      const response = await user.post(VITE_conv_route_CREATE_ONE, {
        friendId,
      });
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
  async getLatestMessage(conversationId: string) {
    try {
      const response = await user.get(
        VITE_message_route_GET_LATEST_MESSAGE + conversationId
      );
      if (response) {
        return response;
      }
    } catch (err: any) {
      throw err;
    }
  }
}
const convoAPI = new ConvoAPIKit();
export default convoAPI;
