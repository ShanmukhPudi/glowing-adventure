import axios from "axios";

// Create a custom axios instance with your backend URL as the base
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach the token to every request that goes out
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;