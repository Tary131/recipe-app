import {FC} from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );
    return (
        <div className="flex justify-center mt-6 fixed bottom-0 left-0 w-full mb-1">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded-l-md disabled:bg-gray-300"
            >
                Previous
            </button>
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 rounded ${
                        number === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                    }`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
