import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, signOut } = useAuth();
  console.log("user: ", user);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-blue-900 text-slate-100 flex flex-col items-center">
      <h1>CRUD REACT & SUPABASE</h1>
      <div className="flex gap-10">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          {user ? (
            <>
              <span>Welcome back, {user.email}</span>

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>

      {/* {!auth && <Link to="/login">Login</Link>}
      {!auth && <Link to="/register">Register</Link>}
      {auth && <button onClick={handleLogout}>Logout</button>} */}
    </nav>
  );
};

export default Navbar;
