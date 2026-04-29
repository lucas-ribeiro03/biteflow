import React from "react";

type HeaderCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
} & React.ComponentProps<"div">;

const HeaderCard = ({ desc, icon, title, ...props }: HeaderCardProps) => {
  return (
    <div
      {...props}
      className={`flex flex-col items-center gap-3 mt-3 bg-card border p-4 py-12 rounded-xl min-w-75  hover:border-accent hover:scale-105 transition duration-200 group cursor-pointer`}
    >
      <div
        className={`rounded-xl bg-accent/10 p-3  group-hover:bg-accent/30 group-hover:text-accent transition duration-200`}
      >
        {icon}
      </div>
      <p className="text-xl font-bold">{title}</p>
      <span className="max-w-40 text-center text-lg">{desc}</span>
    </div>
  );
};

export default HeaderCard;
