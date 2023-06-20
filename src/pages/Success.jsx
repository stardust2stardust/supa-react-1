import { Link } from "react-router-dom";

function Success() {
  return (
    <section className="w-full p-10">
      <div className="max-w-[400px] mx-auto">
        <h1 className="text-2xl font-bold text-stone-50">
          Registration Successful!
        </h1>
        <h2 className="text-lg text-stone-50">
          <Link
            to={"/login"}
            className="text-red-800">
            Login
          </Link>{" "}
          to add your bowl recipes!
        </h2>
      </div>
    </section>
  );
}

export default Success;
