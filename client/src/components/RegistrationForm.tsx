import { FC, ChangeEvent, FormEvent } from "react";
import InputField from "./InputField";

interface RegistrationFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  loading,
}) => {
  const passwordsMatch = password === confirmPassword;

  return (
    <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
      <InputField
        id="email"
        type="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="name@company.com"
        ariaLabel="Your email"
        required
      />
      <InputField
        id="password"
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        placeholder="••••••••"
        ariaLabel="Password"
        required
      />
      <InputField
        id="confirm-password"
        type="password"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value)
        }
        placeholder="••••••••"
        ariaLabel="Confirm Password"
        required
      />
      {!passwordsMatch && (
        <p className="text-red-500 text-sm">Passwords do not match</p>
      )}
      <button
        type="submit"
        className={`w-full text-white rounded-lg text-sm px-5 py-2.5 text-center ${
          loading ? "bg-gray-500" : "bg-blue-500"
        } bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
        disabled={loading || !passwordsMatch}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegistrationForm;
