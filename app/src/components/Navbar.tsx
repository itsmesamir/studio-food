import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useUserStore from "stores/useUserStore";

import studio_logo from "../assets/studio-logo.jpeg";

const Navbar = () => {
  const { data: currentUser, logout } = useUserStore();

  const isAdmin = currentUser?.roles === "admin";
  const isStaff = currentUser?.roles === "staff";

  const canManageUsers = isAdmin || isStaff;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          <img
            src={studio_logo}
            alt="logod"
            className="w-[60px] h-[60px] rounded-full"
          />
        </Link>
        <div>
          {currentUser && (
            <Link to="/scan" className="text-white mx-4">
              Scan Order
            </Link>
          )}

          {currentUser && canManageUsers && (
            <Link to="/users" className="text-white mx-4">
              Users
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
