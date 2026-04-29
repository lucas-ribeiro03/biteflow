import z from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Insira o nome do produto")
    .max(40, "O nome do produto pode ter no máximo 40 caractéres"),

  salePrice: z.string().min(1, "Insira o preço do produto"),
  category: z.string(),
  ingredients: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        unit: z.string().min(1, "Selecione a unidade"),
        quantity: z.string().min(1, "Informe a quantidade"),
      }),
    )
    .min(1, "Selecione ao menos um ingrediente"),
});
