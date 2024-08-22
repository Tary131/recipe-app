import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
});

RecipeSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, { rating }) => acc + rating, 0);
  return sum / this.ratings.length;
};

export default mongoose.model("Recipe", RecipeSchema);
