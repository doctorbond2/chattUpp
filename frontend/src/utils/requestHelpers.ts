import axios from "axios";
const BaseUrl = import.meta.env.VITE_BaseUrl;
const admin_request_key = import.meta.env.VITE_ADMIN_API_KEY;
export const admin = axios.create({
  baseURL: BaseUrl,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    Authorization: admin_request_key,
  },
});
export const client = axios.create({
  baseURL: BaseUrl,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const user = axios.create({
  baseURL: BaseUrl,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GET_request = async (url: string) => {
  try {
    const response = await client.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err: any) {
    return { error: "GET REQUEST ERROR: " + err.message };
  }
};
export const START_request = async () => {
  const url = "auth/start/verify/tokens";
  try {
    const response = await client.get(url);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err: any) {
    throw err;
  }
};
export const user_GET_request = async (url: string, token: string) => {
  try {
    const response = await user.get(url, {
      headers: { Authorization: "Bearer: " + token },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err: any) {
    return { error: "GET REQUEST ERROR: " + err.message };
  }
};
export const POST_request = async (url: string, data: any) => {
  try {
    const response = await client.post(url, data);
    if (response.status === 201) {
      return { response: response, ok: "Created" };
    } else {
      return null;
    }
  } catch (err: any) {
    console.error({ error: "POST REQUEST ERROR: " + err.message });
    return null;
  }
};
export const LOGIN_request = async (url: string, data: any) => {
  try {
    const response = await client.post(url, data);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err: any) {
    console.error({ error: "POST REQUEST ERROR: " + err.message });
    return null;
  }
};
export const REFRESH_request = async (url: string, data: any) => {
  try {
    const response = await client.post(url, data);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err: any) {
    throw err;
  }
};
export const PUT_request = async (url: string, data: any) => {
  try {
    const response = await client.put(url, data);
    if (response.status === 200) {
      return { response: response, ok: "Updated" };
    } else {
      return false;
    }
  } catch (err: any) {
    console.error({ error: "UPDATE REQUEST ERROR: " + err.message });
    return false;
  }
};
export const admin_DELETE_request = async (url: string) => {
  try {
    const response = await admin.delete(url);
    if (response.status === 204) {
      return { response: response, ok: "Deleted" };
    } else {
      return false;
    }
  } catch (err: any) {
    console.error({ error: "DELETE REQUEST ERROR: " + err.message });
    return false;
  }
};
export const fetchAndSetState = async () => {};
