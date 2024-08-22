import { FC } from "react";
import { Link } from "react-router-dom";

interface Recipe {
  _id: string;
  name: string;
  description: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { _id, name, description } = recipe;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-700">{description.substring(0, 100)}...</p>
        <Link
          to={`/recipes/${_id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
