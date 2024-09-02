import { FC } from "react";
import PageInfo from "./PageInfo";
import PaginationNav from "./PaginationNav";

interface DesktopPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageNumbers: number[];
}

const DesktopPagination: FC<DesktopPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbers,
}) => (
  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <PageInfo currentPage={currentPage} totalPages={totalPages} />
    <PaginationNav
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      pageNumbers={pageNumbers}
    />
  </div>
);

export default DesktopPagination;
