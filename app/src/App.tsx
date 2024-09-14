import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import ScanOrder from "./components/Dashboard/ScanOrder";
import AdminTable from "./components/AdminTable";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./components/Error";

const App = () => {
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = React.useState<string | null>(
    localStorage.getItem("role")
  );

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setRole={setRole} />}
          />
          <Route path="/scan" element={<ScanOrder />} />
          {/* <Route
            path="/scan"
            element={<PrivateRoute component={ScanOrder} role="user" />} // Only authenticated users can access this route
          /> */}
          <Route
            path="/admin"
            element={<PrivateRoute component={AdminTable} role="admin" />} // Only admin users can access this route
          />
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
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
