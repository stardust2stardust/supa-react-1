import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <Navbar />

      <main className="h-full bg-zinc-200 text-zinc-900">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
