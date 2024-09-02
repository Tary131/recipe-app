import { FC } from "react";
import Button from "./Button";

interface MobilePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MobilePagination: FC<MobilePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => (
  <div className="flex flex-1 justify-between sm:hidden">
    <Button
      onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      label="Previous"
    />
    <Button
      onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      label="Next"
    />
  </div>
);

export default MobilePagination;
