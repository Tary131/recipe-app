import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
  _id: string;
  name: string;
  description: string;
  ratings: { userId: string; rating: number }[];
}

interface RecipeState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipe: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
  },
});

export const { setRecipes, setSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
