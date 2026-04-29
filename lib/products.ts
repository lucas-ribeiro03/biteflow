import { prisma } from "./prisma";

export const getProductsFromTenant = async (tenantId: string) => {
  const products = await prisma.product.findMany({
    where: { tenantId },
  });

  if (products.length < 1) return "Sem produtos cadastrados";

  return products;
};
