"use server";

import { getIngredients } from "@/lib/ingredients";
import Ingredients from "../Ingredients/Ingredients";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CreateProductForm from "./CreateProductForm";

type CreateProductModalProps = {
  trigger: React.ReactNode;
};

const CreateProductModal = async ({ trigger }: CreateProductModalProps) => {
  const ingredients = await getIngredients();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar produto</DialogTitle>
          </DialogHeader>
          <CreateProductForm
            ingredientsComponent={<Ingredients ingredients={ingredients} />}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateProductModal;
