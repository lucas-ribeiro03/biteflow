"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SidebarLinkProps = {
  icon: React.ReactNode;
  content: string;
  path: string;
} & React.ComponentProps<"div">;

const SidebarLink = ({ content, icon, path, ...props }: SidebarLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={`cursor-pointer group`}
      {...props}
      onClick={() => router.push(path)}
    >
      <div
        className={`flex gap-3 p-3 group-hover:bg-accent/40 w-[90%] ml-2 rounded-full transition duration-300 font-semibold ${pathname.slice(8) === content.toLowerCase() ? "bg-accent/40 text-amber-500" : null}`}
      >
        <span>{icon}</span>
        <span>{content}</span>
      </div>
    </div>
  );
};

export default SidebarLink;
