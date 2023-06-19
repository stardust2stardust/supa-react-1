import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordRef.current?.value ||
      !emailRef.current?.value ||
      !confirmPasswordRef.current?.value
    ) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Oops! Passwords do not match");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (!error && data) {
        navigate("/success");
      }
    } catch (error) {
      setErrorMsg("Error in Creating Account");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-md flex flex-col gap-6 w-4/5 max-w-[400px] mt-20 p-4">
        <div
          id="email"
          className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="border-2 rounded-md"
          />
        </div>
        <div
          id="password"
          className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="border-2 rounded-md"
          />
        </div>
        <div
          id="confirmPassword"
          className="flex flex-col">
          <label>Confirm Password</label>
          <input
            type="password"
            ref={confirmPasswordRef}
            required
            className="border-2 rounded-md"
          />
        </div>
        {errorMsg && (
          <p
            variant="danger"
            onClose={() => setErrorMsg("")}
            dismissible>
            {errorMsg}
          </p>
        )}
        <div className="text-center mt-2">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-900 text-slate-100 py-1 px-3 rounded-md">
            Sign Up
          </button>
        </div>
      </form>

      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link
          to={"/login"}
          className="text-pink-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
