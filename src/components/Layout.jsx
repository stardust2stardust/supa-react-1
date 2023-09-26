import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between min-h-[100vh] max-w-[1600px] mx-auto">
      <Navbar />

      <main className="bg-zinc-200 text-zinc-900 min-h-[calc(100vh-108px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
