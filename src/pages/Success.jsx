import { Link } from "react-router-dom";

function Success() {
  return (
    <section className="w-full p-10">
      <div className="max-w-[400px] mx-auto">
        <h1 className="text-2xl font-bold">Registration Successful!</h1>
        <h2 className="text-lg">
          <Link
            to={"/login"}
            className="text-pink-600">
            Login
          </Link>{" "}
          to add your bowl recipes!
        </h2>
      </div>
    </section>
  );
}

export default Success;
