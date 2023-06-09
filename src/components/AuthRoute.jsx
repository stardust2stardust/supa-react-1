import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ path: location.pathname }}
    />
  );
};

export default AuthRoute;
