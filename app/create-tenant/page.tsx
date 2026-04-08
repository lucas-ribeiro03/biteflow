import Navbar from "@/components/Navbar";
import CreateTenantForm from "@/components/CreateTenantForm";

const CreateTenantPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar backUrl="/" backLabel="Voltar" />
      <div className="max-w-140 mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Criar seu restaurante
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure as informações básicas do seu negócio
          </p>
        </div>
        <CreateTenantForm />
      </div>
    </div>
  );
};

export default CreateTenantPage;
