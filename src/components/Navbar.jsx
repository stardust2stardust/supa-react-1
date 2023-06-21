import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { user, signOut, setUser, setAuth } = useAuth();
  const emailName = user?.email.split("@")[0];
  const intial = user?.email.split("@")[0][0].toUpperCase();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
      setUser(null);
      setAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-green-700 text-stone-50 flex flex-col gap-2 items-center p-4">
      <div className="container flex items-center justify-between sticky top-0">
        <Link to="/">
          <h1 className="text-xl font-bold">SUPABOWLS</h1>
        </Link>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <Link to="/create">
                <PlusCircleIcon className="w-8 h-8 text-stone-50" />
              </Link>
              <div className="w-7 h-7 flex items-center justify-center bg-stone-50 text-green-700 text-md rounded-full">
                {intial}
              </div>

              {/* <button
                onClick={handleLogout}
                className="text-sm">
                Logout
              </button> */}
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">Login</Link>
              {/* <Link to="/register">Register</Link> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
