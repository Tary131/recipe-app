import { useState, FC, FormEvent, useCallback, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { login as loginApi } from "../api/auth";
import { login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const { user, token } = await loginApi(email, password);
        dispatch(login({ user, token }));
        navigate("/");
      } catch (error) {
        console.error(error.message);
      }
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
        className="block w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
        className="block w-full p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
