import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />

      <main className="h-full bg-zinc-100 text-zinc-900">{children}</main>
    </div>
  );
};

export default Layout;
