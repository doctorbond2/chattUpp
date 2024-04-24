import { client } from "../requestHelpers";
import { TwoTokens } from "../../types/authTypes";

class LocalStorageKit {
  constructor() {
    console.log("meme");
  }
  STORAGE_TOKEN_KEY = import.meta.env.VITE_STORAGE_TOKEN_KEY;
  setTokenInStorage(tokens: TwoTokens) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(tokens));
    client.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;
  }
  getTokensFromStorage() {
    const token = localStorage.getItem(this.STORAGE_TOKEN_KEY);
    if (token) {
      const parsedToken = JSON.parse(token);
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsedToken?.access}`;
      return parsedToken;
    }
    return null;
  }
  deleteTokenFromStorage() {
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    delete client.defaults.headers.common["Authorization"];
  }
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
