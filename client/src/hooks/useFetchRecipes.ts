import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRecipes } from "../features/recipeSlice";
import { fetchRecipes } from "../api/recipes";

export const useFetchRecipes = (currentPage: number, searchQuery: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchAndSetRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const { recipesData, totalPages } = await fetchRecipes(
          currentPage,
          searchQuery
        );
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

    fetchAndSetRecipes();
  }, [currentPage, searchQuery, dispatch]);

  return { loading, error, totalPages };
};
