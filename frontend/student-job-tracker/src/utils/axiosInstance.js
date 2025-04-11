import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000", // use your backend URL
  timeout:10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional if you're dealing with cookies/auth
});

export default axiosInstance;
