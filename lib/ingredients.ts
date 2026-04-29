import { prisma } from "./prisma";

export const getIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany();
  if (!ingredients) return null;

  return ingredients;
};
