import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "stores/useUserStore";

const PrivateRoute = ({ role }: any) => {

  const {data: user} = useUserStore();

  const isAuthenticated = !!user;
  const userRole = user?.role

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole && userRole !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />; // Renders child routes if user is authenticated and has the required role
};

export default PrivateRoute;
