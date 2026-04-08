"use server";
import { auth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import GoBackButton from "./GoBackButton";

type NavbarProps = {
  backUrl?: string;
  backLabel?: string;
};

const Navbar = async ({ backLabel, backUrl }: NavbarProps) => {
  const session = await auth();

  return (
    <nav className="border-b border-slate-200/20">
      <div className="flex justify-between py-6 px-12 items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent">BiteFlow</h1>
        </div>
        {backUrl ? (
          <GoBackButton label={backLabel} />
        ) : (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="bg-accent rounded-full w-5 h-5 text-center flex items-center justify-center p-6 text-2xl cursor-pointer">
                  {session?.user?.name?.slice(0, 1)}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-35">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Conta</DropdownMenuLabel>
                  <DropdownMenuItem>Meu perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <p>{session?.user?.name}</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
