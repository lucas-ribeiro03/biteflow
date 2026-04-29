"use server";

import Container from "@/components/Container";
import Cards from "@/components/Dashboard/Cards";
import { auth } from "@/lib/auth";
import { DollarSignIcon } from "lucide-react";

const DashboardPage = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.name) return null;
  return (
    <Container>
      <h1>Bem vindo, {session.user.name}</h1>
      <span>Aqui está um resumo do seu restaurante</span>
      <div className="flex justify-between">
        <Cards
          name="Faturamento de hoje"
          stat="80"
          statType="money"
          icon={<DollarSignIcon />}
        />
        <Cards
          name="Faturamento de hoje"
          stat="80"
          statType="money"
          icon={<DollarSignIcon />}
        />
        <Cards
          name="Faturamento de hoje"
          stat="80"
          statType="money"
          icon={<DollarSignIcon />}
        />
        <Cards
          name="Faturamento de hoje"
          stat="80"
          statType="money"
          icon={<DollarSignIcon />}
        />
      </div>
    </Container>
  );
};

export default DashboardPage;
