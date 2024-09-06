// src/components/Error404.jsx
import React from "react";
import "../Style/Error.css";
import { Link } from "react-router-dom";


const Error404 = () => {
  document.querySelector("title").innerHTML = "𝗖𝗵𝗮𝘁𝘀𝗔𝗽𝗽 |  𝗘𝗿𝗿𝗼𝗿 404"
  return (
    <div className="errorPage">
      <div className="errorContent">
        <h1 className="errorTitle">404</h1>
        <p className="errorMessage">Oops! Page not found.</p>
        <Link to="/" className="homeLink">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
