import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      setLoading(true);
      if (!passwordRef.current?.value || !emailRef.current?.value) {
        setErrorMsg("Please fill in the fields");
        return;
      }
      const {
        data: { user, session },
        error,
      } = await login(emailRef.current.value, passwordRef.current.value);
      if (error) setErrorMsg(error.message);
      if (user && session) navigate("/");
    } catch (error) {
      setErrorMsg("Email or Password Incorrect");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center ">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-md flex flex-col gap-6 w-1/2 mt-10 p-4">
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
            Login
          </button>
        </div>
      </form>

      <div className="w-100 text-center mt-2">
        New User?{" "}
        <Link
          to={"/register"}
          className="text-pink-600">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
