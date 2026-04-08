"use client";

import HeaderCard from "./HeaderCard";
import { PlusIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center mt-12 ">
        <h1 className="text-4xl font-bold">Bem Vindo ao BiteFlow</h1>
        <span className="text-xl text-slate-50/70">
          Gerencie ou entre em um restaurante
        </span>

        <div className="flex gap-8">
          <HeaderCard
            desc="Configure seu próprio restaurante"
            icon={<PlusIcon />}
            title="Criar restaurante"
            onClick={() => router.push("/create-tenant")}
          />
          <HeaderCard
            desc="Use um código de convite"
            icon={<UsersIcon />}
            title="Entrar em um restaurante"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
