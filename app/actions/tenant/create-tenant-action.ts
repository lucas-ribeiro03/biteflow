"use server";

import { createTenant } from "@/app/services/tenant-service";
import { auth } from "@/lib/auth";
import { createTenantSchema } from "@/schema/create-tenant";

export const createTenantAction = async (formData: FormData) => {
  const validateObjects = createTenantSchema.safeParse({
    name: formData.get("name")?.toString().trim(),
    plan: formData.get("plan")?.toString().trim(),
    niche: formData.get("niche")?.toString().trim(),
  });

  const session = await auth();

  if (validateObjects.error) {
    return {
      message: "Dados inválidos",
      success: false,
    };
  }

  const { name, plan, niche } = validateObjects.data;

  if (!name || !plan || !niche) {
    return {
      message: "Preencha todos os campos!",
      success: false,
    };
  }

  if (!session || !session.user || !session.user.id) {
    return {
      message: "Erro inesperado, tente novamente mais tarde",
      success: false,
    };
  }
  await createTenant(name, plan, session?.user.id, niche);

  return {
    message: "Restaurante criado com sucesso",
    success: true,
  };
};
