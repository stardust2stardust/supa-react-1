import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-50 w-full flex items-center justify-center p-3">
      <div>© {new Date().getFullYear()} | by Jeni</div>
    </footer>
  );
};

export default Footer;
