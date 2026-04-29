import React from "react";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Control } from "react-hook-form";
import z from "zod";
import { createProductSchema } from "@/schema/product";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import Ingredients from "./Ingredients";

type CreateProduct = z.infer<typeof createProductSchema>;

type AddIngredientOnProductProps = {
  control: Control<CreateProduct>;
};

const AddIngredientOnProduct = ({ control }: AddIngredientOnProductProps) => {
  return (
    <FormField
      name="ingredients"
      control={control}
      render={({ field }) => (
        <FormItem className="col-span-2">
          <span>Ingredientes</span>
          <FormControl>
            <div className="py-4 px-3 flex flex-col gap-2 border-2 rounded-lg border-dotted border-border">
              <header className="flex items-center justify-between gap-2">
                <p className="text-md text-muted-foreground">
                  Ingredientes adicionados
                </p>
                <Ingredients
                  trigger={
                    <Button>
                      <PlusIcon /> Adicionar
                    </Button>
                  }
                />
              </header>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default AddIngredientOnProduct;
