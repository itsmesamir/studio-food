import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useUserStore from "stores/useUserStore";

const Navbar = () => {
  const { data: currentUser, logout } = useUserStore();

  const isAdmin = currentUser?.role === "admin";

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          {/* TODO: Fix the logo */}
          {/* <img src={logo} alt="logod" className="w-[80px] h-[80px]" /> */}
        </Link>
        <div>
          {currentUser && (
            <Link to="/scan" className="text-white mx-4">
              Scan Order
            </Link>
          )}

          {currentUser && isAdmin && (
            <Link to="/admin" className="text-white mx-4">
              Admin
            </Link>
          )}

          {currentUser && (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          )}

          {!currentUser && (
            <button
              onClick={handleLogin}
              className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
