"use client";

import z from "zod";
import PlanSelector from "./PlanSelector";
import { createTenantSchema } from "@/schema/create-tenant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createTenantAction } from "@/app/actions/tenant/create-tenant-action";
import { LoaderCircleIcon } from "lucide-react";

const CreateTenantForm = () => {
  type CreateTenantFormData = z.infer<typeof createTenantSchema>;
  const form = useForm<CreateTenantFormData>({
    resolver: zodResolver(createTenantSchema),
    mode: "onChange",
    defaultValues: { name: "", niche: "", plan: "Bronze" },
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: CreateTenantFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("niche", data.niche);
    formData.append("plan", data.plan);

    const result = await createTenantAction(formData);
    console.log(result);
  };

  return (
    <Form {...form}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do restaurante</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Burguer House"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="niche"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nicho</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nicho" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-border">
                    <SelectItem value="hamburgueria">Hamburgueria</SelectItem>
                    <SelectItem value="pizzaria">Pizzaria</SelectItem>
                    <SelectItem value="restaurante">Restaurante</SelectItem>
                    <SelectItem value="lanchonete">Lanchonete</SelectItem>
                    <SelectItem value="cafeteria">Cafeteria</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <PlanSelector control={form.control} />
          {isSubmitting ? (
            <Button disabled={!isValid || isSubmitting} className="flex gap-3">
              Criando Restaurante
              <LoaderCircleIcon className="animate-spin duration-300" />
            </Button>
          ) : (
            <Button disabled={!isValid || isSubmitting}>
              Criar Restaurante
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default CreateTenantForm;
