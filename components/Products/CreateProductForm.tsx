"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  Stepper,
  StepperItem,
  StepperContent,
  StepperMethods, // Importa a interface StepperMethods
} from "../ui/stepper"; // Assumindo que stepper_component.tsx está em './'
import { createProductSchema } from "@/schema/product";
import { createProductAction } from "@/app/actions/products/createProductAction";

// Esquema de validação do produto (usando o do usuário)

type CreateProductFormData = z.infer<typeof createProductSchema>;
type CreateProductFormProps = {
  ingredientsComponent: React.ReactNode;
};

const CreateProductForm = ({
  ingredientsComponent,
}: CreateProductFormProps) => {
  // Usando StepperMethods para tipar corretamente o useRef
  const stepperRef = React.useRef<(HTMLDivElement & StepperMethods) | null>(
    null,
  );

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
    defaultValues: { category: "", ingredients: [], name: "", salePrice: "" },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: CreateProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.salePrice);
    formData.append("category", data.category);
    formData.append("ingredients", JSON.stringify(data.ingredients));
    const action = await createProductAction(formData);
    console.log(action);
  };

  // Função para avançar para o próximo passo com validação
  const handleNextStep = async (currentStep: number) => {
    console.log(currentStep);

    let isValidStep = false;
    if (currentStep === 1) {
      // Valida os campos do primeiro passo
      isValidStep = await form.trigger(["name", "salePrice", "category"]);
    } else if (currentStep === 2) {
      // Validação para ingredientes
      isValidStep = await form.trigger("ingredients");
      if (!isValidStep) {
        form.setError("ingredients", {
          type: "manual",
          message: "Selecione ao menos um ingrediente.",
        });
      } else {
        form.clearErrors("ingredients"); // Limpa o erro se ingredientes forem selecionados
      }
    }

    if (isValidStep) {
      stepperRef.current?.nextStep();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Stepper ref={stepperRef}>
          <StepperItem>
            <span className="text-sm font-medium">Informações</span>
          </StepperItem>

          <StepperItem>
            <span className="text-sm font-medium">Ingredientes</span>
          </StepperItem>

          <StepperItem>
            <span className="text-sm font-medium">Revisão</span>
          </StepperItem>

          <StepperContent step={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Nome do produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: X-Burguer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="salePrice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço de venda</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 0,00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Hambúrguer (Opcional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button type="button" onClick={() => handleNextStep(1)}>
                Próximo: Ingredientes
              </Button>
            </div>
          </StepperContent>

          <StepperContent step={2}>
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Selecione os ingredientes:</FormLabel>
                <FormControl>
                  <div>{ingredientsComponent}</div>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => stepperRef.current?.prevStep()}
              >
                Voltar
              </Button>
              <Button type="button" onClick={() => handleNextStep(2)}>
                Próximo: Revisão
              </Button>
            </div>
          </StepperContent>

          {/* Passo 3: Revisão e Finalização */}
          <StepperContent step={3}>
            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-lg">Revise seu produto</h3>
              <p className="text-sm text-muted-foreground">
                Confirme os detalhes antes de criar.
              </p>
              <div className="text-left p-4 border rounded-md bg-muted/30">
                <p>
                  <strong>Nome:</strong> {form.watch("name")}
                </p>
                <p>
                  <strong>Preço:</strong> R${" "}
                  {Number(form.watch("salePrice")).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p>
                  <strong>Categoria:</strong> {form.watch("category") || "N/A"}
                </p>
                <div>
                  <strong>Ingredientes:</strong>
                  {form.watch("ingredients")?.length ? (
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      {form.watch("ingredients").map((ing) => (
                        <li key={ing.id} className="text-sm">
                          {ing.unit === "gramas"
                            ? `${ing.quantity}g de ${ing.name}`
                            : `${ing.quantity} ${ing.name}`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    " Nenhum"
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => stepperRef.current?.prevStep()}
              >
                Voltar
              </Button>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Criar Produto
              </Button>
            </div>
          </StepperContent>
        </Stepper>
      </form>
    </Form>
  );
};

export default CreateProductForm;
