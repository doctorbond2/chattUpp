import { client, admin, user } from "../requestHelpers";
import { TwoTokens } from "../../types/authTypes";
class LocalStorageKit {
  constructor() {
    console.log("meme");
  }
  STORAGE_TOKEN_KEY = "STORAGE_TOKEN_KEY";

  setTokenInStorage(tokens: TwoTokens) {
    localStorage.setItem(this.STORAGE_TOKEN_KEY, JSON.stringify(tokens));
    client.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;
  }

  getTokenFromStorage() {
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

  deleteTokenFormStorage() {
    localStorage.removeItem(this.STORAGE_TOKEN_KEY);
  }
}

const localStorageKit = new LocalStorageKit();

export default localStorageKit;
