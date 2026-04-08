import { Control } from "react-hook-form";
import PlanCard from "./PlanCard";
import { FormControl, FormField, FormItem } from "./ui/form";
import z from "zod";
import { createTenantSchema } from "@/schema/create-tenant";

const plans = [
  {
    name: "Bronze",
    price: 0,
    badge: "Grátis",
    badgeVariant: "success" as const,
    nameColor: "text-primary",
    benefits: [
      "Até 7 produtos",
      "Até 5 ingredientes",
      "Controle de estoque",
      "Gestão de pedidos",
      "1 usuário",
    ],
  },
  {
    name: "Prata",
    price: 99,
    badge: "Popular",
    badgeVariant: "secondary" as const,
    nameColor: "text-secondary",
    benefits: [
      "Produtos ilimitados",
      "Ingredientes ilimitados",
      "Dashboard completo",
      "Até 5 funcionários",
      "Relatórios de vendas",
    ],
  },
  {
    name: "Ouro",
    price: 199,
    nameColor: "text-foreground",
    opacity: true,
    benefits: [
      "Tudo do Prata",
      "Funcionários ilimitados",
      "Suporte prioritário",
    ],
  },
];

type CreateTenantFormData = z.infer<typeof createTenantSchema>;

type PlanSelectorProps = {
  control: Control<CreateTenantFormData>;
};

const PlanSelector = ({ control }: PlanSelectorProps) => {
  return (
    <FormField
      control={control}
      name="plan"
      render={({ field }) => (
        <FormItem>
          <p className="text-[13px] font-medium text-muted-foreground mb-3">
            Escolha seu plano
          </p>
          <FormControl>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  {...plan}
                  selected={field.value === plan.name}
                  onClick={() => field.onChange(plan.name)}
                />
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default PlanSelector;
