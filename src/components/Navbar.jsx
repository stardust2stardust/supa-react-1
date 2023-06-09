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
    <nav>
      <h1>Supa Smoothies</h1>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Welcome back, {user.email}</span>

          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {/* {!auth && <Link to="/login">Login</Link>}
      {!auth && <Link to="/register">Register</Link>}
      {auth && <button onClick={handleLogout}>Logout</button>} */}
    </nav>
  );
};

export default Navbar;
