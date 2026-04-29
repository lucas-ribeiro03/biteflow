import SidebarHeader from "./SidebarHeader";
import SidebarLink from "./SidebarLink";
import {
  BoxIcon,
  CheckSquareIcon,
  LayoutGridIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "lucide-react";
import SidebarFooter from "./SidebarFooter";

type SidebarProps = {} & React.ComponentProps<"div">;

const Sidebar = ({ ...props }: SidebarProps) => {
  return (
    <nav
      className={`flex flex-col border-r border-border h-screen relative ${props.className}`}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader />
        <div className="mt-20 flex flex-col gap-2">
          <SidebarLink
            content="Dashboard"
            icon={<LayoutGridIcon />}
            path="/tenant/dashboard"
          />
          <SidebarLink
            content="Produtos"
            icon={<ShoppingBagIcon />}
            path="/tenant/products"
          />
          <SidebarLink
            content="Estoque"
            icon={<BoxIcon />}
            path="/tenant/stock"
          />
          <SidebarLink
            content="Pedidos"
            icon={<CheckSquareIcon />}
            path="/tenant/orders"
          />
          <SidebarLink
            content="Funcionários"
            icon={<UsersIcon />}
            path="/tenant/collaborators"
          />
          <SidebarLink
            content="Configurações"
            icon={<SettingsIcon />}
            path="/tenant/settings"
          />
        </div>
        <SidebarFooter />
      </div>
    </nav>
  );
};

export default Sidebar;
