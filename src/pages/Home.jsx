import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { user } = useAuth();
  const name = user?.email.split("@")[0] || "Guest user";
  return (
    <section className="">
      <div className="">
        <img
          srcset="food-prep-400w.jpg 400w, food-prep-640w.jpg 640w"
          sizes="(max-width: 600px) 400px, 640px"
          src="food-prep-640w.jpg"
          alt="Food preparation"
          className=""
        />
        <div className="flex flex-col justify-center items-center">
          <h1>Hi {name}!</h1>

          <div>
            <p>Looking for a yummy bowl recipe?</p>
            <Link to="/bowls">Bowl recipes</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
