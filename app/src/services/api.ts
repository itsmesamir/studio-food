import axios from "axios";

// Base URL for API requests
const API_URL = "http://localhost:5000/api"; // Update with your backend URL if needed

// Axios instance for API requests
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors to include JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

// Order API
export const getOrders = (params: any) => api.get("/orders", { params });

// User API
export const getUserById = (id: string) => api.get(`/users/${id}`);

export const getCurrentUser = async () => {
  const response = await api.get(`/users/current`);

  return response.data;
};

// Exporting API functions
export default {
  login,
  getOrders,
  getUserById,
};
