import { auth } from "@/lib/auth";
import React from "react";

const SidebarFooter = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }

  console.log(session);
  return (
    <div className="border-t border-border absolute bottom-15 w-full">
      <div className="p-3 flex gap-4 items-center">
        <div className="flex bg-accent w-10 h-10 rounded-full items-center justify-center">
          {session.user.name?.slice(0, 1)}
        </div>
        <div>{session.user.name}</div>
      </div>
    </div>
  );
};

export default SidebarFooter;
