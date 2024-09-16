import config from "config";

const api = {
  baseUrl: config.apiBaseURI as string,
  basePath: "",
  signUp: "/users/signup",
  signIn: "/users/signin",
  currentUser: `/users/currentuser`,
  logout: `/users/logout`,
  designations: "/designations",
  roles: "/roles",
  users: "/users",

  order: {
    orders: "/orders",
  },
};

export default api;
