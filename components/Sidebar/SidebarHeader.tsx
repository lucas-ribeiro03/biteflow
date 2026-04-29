"use server";

import { auth, getUserTenant } from "@/lib/auth";
import React from "react";

type SidebarHeaderProps = {} & React.ComponentProps<"header">;

const SidebarHeader = async ({ ...props }: SidebarHeaderProps) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const tenant = await getUserTenant(session?.user?.id);

  return (
    <header className={`border-b border-border ${props.className}`}>
      <div className="p-4">
        <h1 className="text-4xl font-bold text-accent">BiteFlow</h1>
        <span className="text-muted-foreground">
          {tenant ? tenant.name : null}
        </span>
      </div>
    </header>
  );
};

export default SidebarHeader;
