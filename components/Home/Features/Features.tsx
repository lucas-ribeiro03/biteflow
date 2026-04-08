import React from "react";
import FeatureCard from "./FeaturesCards";
import {
  BoxIcon,
  CheckSquareIcon,
  CookingPotIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const Features = () => {
  return (
    <div className="grid grid-cols-2 max-w-7xl mx-auto gap-8">
      <FeatureCard
        title="Dashboard"
        icon={<LayoutDashboardIcon />}
        desc="Métricas em tempo real"
      />
      <FeatureCard
        title="Produtos"
        icon={<CookingPotIcon />}
        desc="Lanches bebidas e mais"
      />
      <FeatureCard
        title="Estoque"
        icon={<BoxIcon />}
        desc="Controle de ingredientes"
      />
      <FeatureCard
        title="Pedidos"
        icon={<CheckSquareIcon />}
        desc="Status de cada venda"
      />
    </div>
  );
};

export default Features;
