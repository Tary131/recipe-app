import { useEffect, FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRecipe } from "../features/recipeSlice";
import { RootState } from "../store";
import { fetchRecipeById } from "../api/recipes";

const RecipeDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const recipe = useSelector(
    (state: RootState) => state.recipes.selectedRecipe
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const recipeData = await fetchRecipeById(id);
          dispatch(setSelectedRecipe(recipeData));
        }
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

    fetchRecipe();
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl">{recipe.name}</h1>
      <p>{recipe.description}</p>
      <div>
        <h3 className="text-xl">Ratings</h3>
        <ul>
          {recipe.ratings.map((rating, index) => (
            <li key={index}>
              User {rating.userId} rated {rating.rating}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetail;
