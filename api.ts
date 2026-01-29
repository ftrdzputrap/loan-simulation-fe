import axios, { AxiosError, type AxiosResponse } from "axios";
import { getMessageFromResponse } from "./src/helpers/utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

const responseInterceptor = (response: AxiosResponse) => {
  if ("error" in response.data && !response?.data?.error) {
    alert(getMessageFromResponse(response))
    return Promise.reject(response);
  }
  return response;
};

const errorInterceptor = (error: AxiosError) => {
  alert(getMessageFromResponse(error))
  return Promise.reject(error);
};

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;