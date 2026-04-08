import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/utils/generate-slug";

export const createTenant = async (
  name: string,
  plan: string,
  userId: string,
  niche: string,
) => {
  const slug = generateSlug(name);
  const planId = await prisma.plan.findFirst({
    where: { name: plan },
  });

  try {
    const tenant = await prisma.tenant.create({
      data: {
        name,
        slug,
        niche,
        status: "Active",
        planId: planId.id,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { tenantId: tenant.id },
    });
  } catch (e) {
    console.log(e, "Erro no servidor");
    return {
      message: "Erro ao criar restaurante, tente novamente mais tarde",
      success: false,
    };
  }
};
