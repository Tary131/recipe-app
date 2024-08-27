import { useState, FC, FormEvent, useCallback, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { login as loginApi } from "../api/auth";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      toast
        .promise(
          loginApi(email, password).then(({ user, token }) => {
            dispatch(login({ user, token }));
            return "Login successful!";
          }),
          {
            pending: "Logging in...",
            success: "Login successful!",
            error: "Invalid email or password",
          }
        )
        .then(() => {
          navigate("/target-page");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, email, navigate, password]
  );

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4"
        aria-labelledby="login-heading"
      >
        <h1 id="login-heading" className="text-xl mb-4">
          Login
        </h1>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          className="block w-full p-2 mb-4 border rounded"
          aria-label="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded"
          aria-label="Password"
          required
        />
        <button
          type="submit"
          className={`w-full p-2 rounded ${
            loading ? "bg-gray-500" : "bg-blue-500"
          } text-white`}
          disabled={loading || !email || !password}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
