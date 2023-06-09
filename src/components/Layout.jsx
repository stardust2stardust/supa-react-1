import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
