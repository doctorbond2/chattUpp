import { admin, client, user } from '../axiosInstanceConfig';
import { TwoTokens } from '../../types/authTypes';

class LocalStorageKit {
  constructor() {
    console.log('meme');
  }
  STORAGE_TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY;
  setTokensInStorage(tokens: TwoTokens) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(tokens));
    client.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
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
    delete client.defaults.headers.common['Refresh-Token'];
    delete admin.defaults.headers.common['Admin-Authorization'];
  }
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
