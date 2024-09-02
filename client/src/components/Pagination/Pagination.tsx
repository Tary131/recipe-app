import { FC } from "react";
import MobilePagination from "./MobilePagination";
import DesktopPagination from "./DesktopPagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 fixed bottom-0 left-0 w-full mb-1">
      <MobilePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <DesktopPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        pageNumbers={pageNumbers}
      />
    </div>
  );
};

export default Pagination;
