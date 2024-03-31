import axios from "axios";
const BaseUrl = import.meta.env.VITE_BaseUrl;

export const POST_request = async (url: string, data: any) => {
  return axios.post(BaseUrl + url, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

export const GET_request = async (url: string) => {
  return axios.get(BaseUrl + url);
};

export const fetchAndSetState = async () => {};
