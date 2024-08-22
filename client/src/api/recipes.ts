import axios from "axios";
import { Recipe } from "../types/Recipe";

const API_URL = "http://localhost:5005/api/recipes";

export const fetchRecipeById = async (id: string) => {
  try {
    const response = await axios.get<Recipe>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
export const fetchRecipes = async () => {
  try {
    const response = await axios.get<{ recipes: Recipe[] }>(API_URL);
    return response.data.recipes;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
