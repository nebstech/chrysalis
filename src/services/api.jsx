import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(import.meta.env.VITE_SESSION_KEY);
  if (token === null) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
