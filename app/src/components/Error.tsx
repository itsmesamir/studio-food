import React from "react";

const Error = () => (
  <div className="flex justify-center items-center h-screen bg-red-100">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-red-600">Error</h2>
      <p className="mt-2 text-gray-700">
        Something went wrong. Please try again later.
      </p>
    </div>
  </div>
);

export default Error;
