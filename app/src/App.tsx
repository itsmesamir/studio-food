import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import ScanOrder from "./components/Dashboard/ScanOrder";
import AdminTable from "./components/admin/AdminTable";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";

import useUserStore from "stores/useUserStore";
import AuthRoute from "components/Auth/AuthRoute";
import { useUsersQuery } from "hooks/useUserQuery";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { loading, fetchUser } = useUserStore();

  // const dd = useUsersQuery();

  // console.log(dd.data);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div className="mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/scan" element={<ScanOrder />} />

            <Route path="/" element={<AuthRoute />}>
              <Route
                path="/admin"
                element={<PrivateRoute component={AdminTable} role="admin" />} // Only admin users can access this route
              />
              {/* <Route
            path="/scan"
            element={<PrivateRoute component={ScanOrder} role="user" />} // Only authenticated users can access this route
            /> */}
              <Route path="/unauthorized" element={<Error />} />
              <Route
                path="/"
                element={
                  <div className="text-center">
                    <h1 className="text-4xl font-bold">
                      Welcome to the Food Order App
                    </h1>
                    <p className="mt-4">Please log in to continue.</p>
                  </div>
                }
              />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
