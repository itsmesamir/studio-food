import React from "react";

const Unauthorized = () => (
  <div className="flex justify-center items-center h-screen bg-red-100">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-red-600">Unauthorized</h2>
      <p className="mt-2 text-gray-700">
        Unauthorized, You donot have access to view this page.
      </p>
    </div>
  </div>
);

export default Unauthorized;
