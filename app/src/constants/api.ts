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
  userRoles: "users/:id/roles",
  countries: "/countries",
  leaveTypes: "/leave-types",
  leaveCredits: "/leave-credits",
  fiscalYears: "/fiscal-years",
  leaves: "/leaves",
  leaveRequests: "/leave-requests",
  updateLeaveStatus: "/leave-requests/:id/status",
  leave: "/leave",
  updateLeave: "/leave/:id",
  menus: "/menus",
  menuItemById: "/menus/:id",
  reviews: "reviews",
  menuCategories: "/menus/categories",
  menuCategoriesById: "/menus/categories/edit/:id",
  menuUnits: "/menus/units",
  menuUnitsById: "/menus/units/edit/:id",
  cafes: "/cafes",
  order: {
    orders: "/orders",
  },
};

export default api;
