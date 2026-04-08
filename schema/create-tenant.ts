import z from "zod";

export const createTenantSchema = z.object({
  name: z
    .string()
    .min(1, "O nome do restaurante é obrigatório")
    .min(6, "Nome do restaurante deve ter pelo menos 6 caractéres")
    .max(50, "Nome do restaurante pode conter no máximo 50 caractéres"),

  niche: z.string().min(1, "Nicho é obrigatório"),
  plan: z.enum(["Bronze", "Prata", "Ouro"]),
});
