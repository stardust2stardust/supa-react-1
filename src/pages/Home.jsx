import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  const name = user?.email.split("@")[0] || "Guest user";
  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1>Hi {name}!</h1>
      <div>
        <p>Looking for a yummy bowl recipe?</p>
        <Link to="/bowls">Bowl recipes</Link>
      </div>
    </div>
  );
};

export default Home;
