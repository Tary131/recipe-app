import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../features/recipeSlice";
import { RootState } from "../store";
import { fetchRecipes } from "../api/recipes";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const RecipeLists = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");


  useEffect(() => {
    fetchAndSetRecipes(currentPage, searchQuery);
  }, [currentPage]);

  const fetchAndSetRecipes = async (page: number, query: string) => {
    try {
      setLoading(true);
      setError(null);
      const { recipesData, totalPages } = await fetchRecipes(page, query);
      dispatch(setRecipes(recipesData));
      setTotalPages(totalPages);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAndSetRecipes(1, searchQuery);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>
        <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe}/>
          ))}
        </div>
        <div className="container mx-auto p-4">
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
          />
        </div>
      </div>
  );
};

export default RecipeLists;
