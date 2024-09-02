import { useState, FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { useFetchRecipes } from "../hooks/useFetchRecipes";
import RecipeCardSkeleton from "../components/Skeletons/RecipeCardSkeleton";
import PaginationSkeleton from "../components/Skeletons/PaginationSkeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeLists = () => {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { loading, error, totalPages } = useFetchRecipes(
    currentPage,
    searchQuery
  );
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const pathname = location.pathname;
  useEffect(() => {
    if (message) {
      toast.success(message);
      navigate(pathname, { replace: true });
    }
  }, [message, pathname, navigate]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  if (error) return <p>Error: {error}</p>;
  if (recipes.length === 0 && !loading) return <p>No recipes found.</p>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="flex justify-center text-3xl font-bold mb-6">Recipes</h1>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <RecipeCardSkeleton key={index} />
              ))
            : recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
        </div>
        {loading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default RecipeLists;
