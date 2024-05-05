import { admin, client, user } from '../axiosInstanceConfig';
import { AdminTokens } from '../../types/authTypes';
import { Conversation } from '../../types/chatTypes';
class LocalStorageKit {
  constructor() {
    console.log('meme');
  }
  STORAGE_TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY;
  setTokensInStorage(tokens: AdminTokens) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(tokens));
    user.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
    if (tokens.adminToken) {
      user.defaults.headers.common[
        'Admin-Authorization'
      ] = `Bearer ${tokens.access}`;
    }
  }
  getTokensFromStorage() {
    const tokens = localStorage.getItem(this.STORAGE_TOKEN_KEY);
    if (tokens) {
      const parsedTokens = JSON.parse(tokens);
      user.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${parsedTokens?.access}`;
      if (parsedTokens?.adminAccess) {
        admin.defaults.headers.common[
          'Admin-Authorization'
        ] = `Bearer ${parsedTokens?.adminAccess}`;
      }
      return parsedTokens;
    }
    return null;
  }
  deleteTokenFromStorage() {
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    delete client.defaults.headers.common['Authorization'];
    delete admin.defaults.headers.common['Admin-Authorization'];
  }
  notificationStorage(conversationId: any) {
    const toStore = conversationId;

    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    let toUpdate = JSON.parse(currentStorage);
    if (!toUpdate.includes(toStore)) {
      toUpdate.push(toStore);
    }
    localStorage.setItem('notifications_list', JSON.stringify(toUpdate));
  }
  removeNotification(conversationId: any) {
    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    let toUpdate: any[] = JSON.parse(currentStorage);
    const index = toUpdate.findIndex((x) => x === conversationId);
    toUpdate.splice(index, 1);
    localStorage.setItem('notifications_list', JSON.stringify(toUpdate));
  }
  getNotificationList(convoList: Conversation[]) {
    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    const notificationsList = JSON.parse(currentStorage);
    return convoList.map((c: Conversation) => {
      for (const n of notificationsList) {
        if (c._id === n) {
          c.hasNewMessage = true;
          break;
        }
      }
      return c;
    });
  }
  getNavNotification() {
    let currentStorage: any =
      localStorage.getItem('notifications_list') || '[]';
    const notificationsList = JSON.parse(currentStorage);
    return notificationsList;
  }
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
