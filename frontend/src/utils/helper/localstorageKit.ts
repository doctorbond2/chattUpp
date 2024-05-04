import { admin, client, user } from '../axiosInstanceConfig';
import { AdminTokens } from '../../types/authTypes';

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
    const toStore = JSON.stringify(conversationId);
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
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
