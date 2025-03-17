import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
  //   baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }

  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default axiosInstance;
