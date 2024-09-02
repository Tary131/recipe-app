import { FC } from "react";

interface NavButtonProps {
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
  icon: JSX.Element;
}

const NavButton: FC<NavButtonProps> = ({
  onClick,
  disabled,
  ariaLabel,
  icon,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    <span className="sr-only">{ariaLabel}</span>
    {icon}
  </button>
);

export default NavButton;
