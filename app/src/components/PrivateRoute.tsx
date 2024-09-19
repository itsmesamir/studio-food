import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "stores/useUserStore";

const PrivateRoute = ({ role }: any) => {
  const { data: user, loading } = useUserStore();

  const isAuthenticated = !!user;
  const userRole = user?.roles;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole && userRole !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
