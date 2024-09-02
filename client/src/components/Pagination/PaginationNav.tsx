import { FC } from "react";
import NavButton from "./NavButton";
import PageButton from "./PageButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageNumbers: number[];
}

const PaginationNav: FC<PaginationNavProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
}) => (
  <nav
    aria-label="Pagination"
    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
  >
    <NavButton
      onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      ariaLabel="Previous"
      icon={<ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />}
    />
    {pageNumbers.map((number) => (
      <PageButton
        key={number}
        number={number}
        isCurrent={number === currentPage}
        onClick={() => onPageChange(number)}
      />
    ))}
    <NavButton
      onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      ariaLabel="Next"
      icon={<ChevronRightIcon aria-hidden="true" className="h-5 w-5" />}
    />
  </nav>
);

export default PaginationNav;
