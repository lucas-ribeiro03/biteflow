"use server";

import { Ingredient } from "@/models/Ingredient";
import IngredientCard from "./IngredientCard";
import { getIngredients } from "@/lib/ingredients";

const IngredientsList = async () => {
  const ingredients = await getIngredients();
  if (!ingredients) return;
  return (
    <div className="flex flex-col">
      {ingredients.map((ingredient: Ingredient) => (
        <div
          key={ingredient.id}
          className="border-b border-border flex-items-center"
        >
          <IngredientCard
            isTemplate={ingredient.isTemplate}
            name={ingredient.name}
            tenantId={ingredient.tenantId}
            nicheSuggest={ingredient.nicheSuggest}
            ingredientId={ingredient.id}
          />
        </div>
      ))}
    </div>
  );
};

export default IngredientsList;
