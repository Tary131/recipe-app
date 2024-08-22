import express from "express";
import {
  getRecipes,
  getRecipe,
  createRecipe,
  rateRecipe,
} from "../controllers/recipeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", authMiddleware, createRecipe);
router.post("/:id/rate", authMiddleware, rateRecipe);

export default router;
