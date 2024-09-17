import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "stores/useUserStore"; // Import your Zustand store

const AuthRoute = () => {
  const { data: user, loading } = useUserStore((state) => state);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated, passing the current location for post-login redirect
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if user is authenticated, render the child routes
  return <Outlet />;
};

export default AuthRoute;
