import axios from "axios";

export const construcloudAPI = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 5000,
});

construcloudAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

construcloudAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_type");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
