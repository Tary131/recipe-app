import { useEffect, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../features/recipeSlice";
import { RootState } from "../store";
import { fetchRecipes } from "../api/recipes";

import RecipeCard from "../components/RecipeCard";

const RecipeList: FC = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const recipesData = await fetchRecipes(); // Use the API function
        dispatch(setRecipes(recipesData));
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

    fetchAndSetRecipes();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (recipes.length === 0) return <p>No recipes found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
