import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    const recipes = await Recipe.find({ name: new RegExp(search, "i") })
      .skip(skip)
      .limit(limit);
    const totalRecipes = await Recipe.countDocuments({
      name: new RegExp(search, "i"),
    });
    res.json({ recipes, totalPages: Math.ceil(totalRecipes / limit) });
  } catch (err) {
    res.status(400).json({ message: "Error fetching recipes" });
  }
};

export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Error fetching recipe" });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { name, description } = req.body;
    const recipe = new Recipe({ name, description });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: "Error creating recipe" });
  }
};

export const rateRecipe = async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.ratings.push({ userId: req.user._id, rating });
    await recipe.save();
    res.json({
      message: "Rating submitted",
      averageRating: recipe.calculateAverageRating(),
    });
  } catch (err) {
    res.status(400).json({ message: "Error rating recipe" });
  }
};
