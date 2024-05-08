import axios from 'axios';
import localStorageKit from './helper/localstorageKit';
const BaseUrl = import.meta.env.VITE_BaseUrl;
const admin_request_key = import.meta.env.VITE_ADMIN_API_KEY;
import AuthAPI from './helper/apiHandlers/authApi';
export const admin = axios.create({
  baseURL: BaseUrl,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: admin_request_key,
  },
});

admin.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
export const client = axios.create({
  baseURL: BaseUrl,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    'x-client-key': admin_request_key,
  },
});
client.interceptors.response.use(
  (response): any => {
    if (response.data.access) {
      localStorageKit.setTokensInStorage(response.data);
      return response;
    } else {
      return response;
    }
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    const errorMessage = error.response.data;
    if (status === 401) {
      console.log('INTERCEPTOR ERROR:', status, errorMessage);
    } else if (status === 404) {
      console.log('INTERCEPTOR ERROR:', status, errorMessage);
    } else {
      console.log('INTERCEPTOR ERROR:', status, errorMessage);
    }
    return Promise.reject(error);
  }
);
export const user = axios.create({
  baseURL: BaseUrl,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
    'x-client-key': admin_request_key,
  },
});
user.interceptors.request.use(
  async (config) => {
    const tokens = localStorageKit.getTokensFromStorage();
    if (tokens && tokens.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => {
    console.log('Caught error in interceptor');
    return Promise.reject(error);
  }
);
let refreshStatus: boolean = false;
user.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      if (!refreshStatus) {
        refreshStatus = true;
        console.log('INTERCEPTOR 401:', status);
        try {
          console.log('Trying to use refreshtoken');
          await AuthAPI.refreshToken();
          refreshStatus = false;
          window.location.reload();
          return;
        } catch (err) {
          error = err;
          return;
        }
      } else {
        return Promise.reject(error);
      }
    } else if (status === 404) {
      console.log('INTERCEPTOR 404:', status);
    } else {
      console.log(error, status);
      console.log('INTERCEPTOR OTHER:', status);
    }
    return Promise.reject(error);
  }
);
