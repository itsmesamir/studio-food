import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

const PrivateRoute = ({ component: Component, role, ...rest }: any) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <Routes>
      <Route
        {...rest}
        render={(props: any) =>
          isAuthenticated ? (
            role === userRole || role === "user" ? (
              <Component {...props} />
            ) : (
              <Navigate to="/unauthorized" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
