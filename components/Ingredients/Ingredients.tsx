import { Ingredient } from "@/models/Ingredient";
import SearchIngredient from "./SearchIngredient";
import IngredientsList from "./IngredientsList";

type IngredientsProps = {
  ingredients: Ingredient[];
};
const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <div>
      <SearchIngredient />
      <IngredientsList />
    </div>
  );
};

export default Ingredients;
