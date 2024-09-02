import { FC } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
}

const Button: FC<ButtonProps> = ({ onClick, disabled, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    {label}
  </button>
);

export default Button;
