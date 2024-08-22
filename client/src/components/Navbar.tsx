import { useState, FormEvent, FC, useCallback, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      console.log("Searching for:", searchQuery);
    },
    [searchQuery]
  );
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Recipe App
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex flex-1 justify-center mx-4"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
            className="p-2 w-full max-w-lg rounded-l-md"
          />
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-r-md text-white"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
