"use server";

import { createProduct } from "@/app/services/product-service";
import { auth } from "@/lib/auth";
import { createProductSchema } from "@/schema/product";

export const createProductAction = async (formData: FormData) => {
  const validatedObj = createProductSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    salePrice: formData.get("price")?.toString().trim(),
    category: formData.get("category")?.toString().trim(),
    ingredients: JSON.parse(formData.get("ingredients")?.toString() || ""),
  });

  if (validatedObj.error) {
    console.log(validatedObj.error);
    return {
      message: "Dados inválidos",
      success: false,
    };
  }
  const { name, salePrice, category, ingredients } = validatedObj.data;
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      message: "Erro de autenticação",
      success: false,
    };
  }
  await createProduct(
    name,
    salePrice,
    category,
    session?.user.tenantId || "",
    ingredients,
  );
};
