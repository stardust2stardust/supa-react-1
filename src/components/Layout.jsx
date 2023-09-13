import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="h-full bg-zinc-200 text-zinc-900">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
