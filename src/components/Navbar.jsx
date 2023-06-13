import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, signOut, setUser, setAuth } = useAuth();
  console.log("user: ", user);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      console.log(error);
      setUser(null);
      setAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-blue-900 text-slate-100 flex flex-col gap-2 items-center p-4 ">
      <Link to="/">
        <h1 className="text-xl">SUPABOWLS</h1>
      </Link>

      <div className="w-full flex items-center justify-between sticky top-0">
        <div className="flex gap-4">
          <div>
            <Link to="/create">Add Bowl</Link>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <span>{user.email}</span>

              <button
                onClick={handleLogout}
                className="bg-slate-100 text-slate-900 px-2 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
