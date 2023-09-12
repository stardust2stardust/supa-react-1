import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Hero = () => {
  const { user } = useAuth();
  const name = user?.email.split("@")[0] || "Guest";
  return (
    <section className="w-full relative">
      <div className="w-full h-full absolute top-0 bg-gradient-to-t from-zinc-950"></div>

      <div className="w-full text-center text-white absolute inset-x-0 bottom-6 flex flex-col items-center gap-3">
        <div className="z-10">
          <h1 className="text-3xl">Hi {name}!</h1>
          <p className="text-xl">Looking for a yummy bowl recipe?</p>
        </div>

        <Link
          to="/bowls"
          className="bg-red-700 px-4 py-1 rounded-2xl">
          View Recipes
        </Link>
      </div>
      <img
        srcSet="food-prep-400w.jpg 400w, food-prep-640w.jpg 640w, food-prep-1920w.jpg 1920w"
        sizes="(max-width: 600px) 400px, (max-width: 1000px) 640px, 1920w"
        src="food-prep-1920w.jpg"
        alt="Food preparation"
        className="w-full max-h-[260px] object-cover"
      />
    </section>
  );
};

export default Hero;
