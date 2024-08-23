import { ChangeEvent, FormEvent, FC } from "react";

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSearch: (e: FormEvent<HTMLFormElement>) => void;
}

const Search: FC<SearchProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form onSubmit={onSearch} className="mb-6 flex justify-center">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                className="p-2 w-full max-w-lg rounded-l-md border border-gray-300"
            />
            <button
                type="submit"
                className="bg-blue-500 p-2 rounded-r-md text-white"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
