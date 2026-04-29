import { prisma } from "./prisma";

export const getTenantPlan = async (id: string) => {
  const plan = await prisma.plan.findUnique({
    where: { id },
  });

  return plan;
};

export const getTenantProducts = async (id: string) => {
  const tenant = await prisma.tenant.findUnique({
    where: { id },
  });

  return tenant;
};
