"use server";

import CreateProductModal from "@/components/Products/CreateProductModal";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getProductsFromTenant } from "@/lib/products";
import { PlusIcon } from "lucide-react";

const ProductsPage = async () => {
  const session = await auth();
  const products = await getProductsFromTenant(session?.user.tenantId || "");
  return (
    <div className="h-full">
      {typeof products === "string" ? (
        <div className="flex flex-col gap-3 items-center justify-center h-full">
          <h1 className="text-2xl font-black">
            Sem produtos cadastrados no momento
          </h1>
          <CreateProductModal
            trigger={
              <div>
                <Button className="py-4 px-6 flex gap-2 items-center text-lg">
                  <PlusIcon />
                  Cadastrar produto
                </Button>
              </div>
            }
          />
        </div>
      ) : (
        <div>Olá mundo 2</div>
      )}
    </div>
  );
};

export default ProductsPage;
