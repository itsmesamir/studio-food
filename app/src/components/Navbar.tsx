import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Food Order App
        </Link>
        <div>
          <Link to="/scan" className="text-white mx-4">
            Scan Order
          </Link>
          <Link to="/admin" className="text-white mx-4">
            Admin
          </Link>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
