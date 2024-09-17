import http from "./http";

// Auth API
export const login = (email: string, password: string) =>
  http.post("/users/signin", { email, password });

// Order API
export const getOrders = (params: any) => http.get("/orders", { params });

// User API
export const getUserById = (id: string) => http.get(`/users/${id}`);

export const getCurrentUser = async () => {
  const response = await http.get(`/users/currentuser`);

  return response.data;
};

// Exporting API functions
export default {
  login,
  getOrders,
  getUserById,
};
