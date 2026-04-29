"use server";

import { prisma } from "@/lib/prisma";

export const createProduct = async (
  name: string,
  salePrice: string,
  category: string,
  tenantId: string,
  ingredients: {
    id: string;
    name: string;
    quantity: string;
    unit: string;
  }[],
) => {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        salePrice,
        category,
        tenantId,
      },
    });

    ingredients.map(async (i) => {
      await prisma.productIngredient.create({
        data: {
          productId: product.id,
          ingredientId: i.id,
          controlType:
            i.unit === "gramas"
              ? "PESO"
              : i.unit === "unidade"
                ? "UNIDADE"
                : "FREQUENCIA",
          quantityReq: i.quantity,
        },
      });
    });
  } catch (e) {
    console.log(e);
  }
};
