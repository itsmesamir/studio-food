import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ role }: any) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole && userRole !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />; // Renders child routes if user is authenticated and has the required role
};

export default PrivateRoute;
