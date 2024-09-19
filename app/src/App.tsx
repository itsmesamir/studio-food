import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import ScanOrder from "./components/Dashboard/ScanOrder";
import AdminTable from "./components/admin/AdminTable";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";

import useUserStore from "stores/useUserStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Unauthorized from "components/Unauthorized";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { loading, fetchUser } = useUserStore();

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
            {/* <Route path="/scan" element={<ScanOrder />} />
            <Route path="/admin" element={<AdminTable />} /> */}
            <Route path="/scan" element={<PrivateRoute />}>
              <Route path="" element={<ScanOrder />} />
            </Route>

            <Route path="/admin" element={<PrivateRoute role="admin" />}>
              <Route path="" element={<AdminTable />} />
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="*" element={<Navigate to="/scan" replace />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
