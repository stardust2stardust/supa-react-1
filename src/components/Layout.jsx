import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <main className="h-screen">{children}</main>
    </div>
  );
};

export default Layout;
