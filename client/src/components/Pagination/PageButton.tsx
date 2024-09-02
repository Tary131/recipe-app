import { FC } from "react";

interface PageButtonProps {
  number: number;
  isCurrent: boolean;
  onClick: () => void;
}

const PageButton: FC<PageButtonProps> = ({ number, isCurrent, onClick }) => (
  <button
    onClick={onClick}
    aria-current={isCurrent ? "page" : undefined}
    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      isCurrent
        ? "bg-blue-500 text-white focus-visible:outline-blue-600"
        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    }`}
  >
    {number}
  </button>
);

export default PageButton;
