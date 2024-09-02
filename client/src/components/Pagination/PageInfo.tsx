import { FC } from "react";

interface PageInfoProps {
  currentPage: number;
  totalPages: number;
}

const PageInfo: FC<PageInfoProps> = ({ currentPage, totalPages }) => (
  <p className="text-sm text-gray-700">
    Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
    <span className="font-medium">
      {Math.min(currentPage * 10, totalPages * 10)}
    </span>{" "}
    of <span className="font-medium">{totalPages * 10}</span> results
  </p>
);

export default PageInfo;
