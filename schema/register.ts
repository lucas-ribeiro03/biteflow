import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Campo obrigatório")
      .min(3, "Necessário pelo menos 3 caractéres")
      .max(50, "Permitido apenas 50 caractéres no máximo"),
    email: z
      .string()
      .min(1, "Campo obrigatório")
      .max(100, "Permitido apenas 50 caractéres no máximo"),
    password: z
      .string()
      .min(1, "Campo obrigatório")
      .min(6, "Necessário pelo menos 6 caractéres")
      .max(30),
    confirmPassword: z
      .string()
      .min(1, "Campo obrigatório")
      .min(6, "Necessário pelo menos 6 caractéres")
      .max(30, "Permitido apenas 30 caractéres no máximo"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });
