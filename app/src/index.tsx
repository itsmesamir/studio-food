import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./tailwind.css";
import { BrowserRouter as Router } from "react-router-dom";

// Render the application
ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <App />
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
);
