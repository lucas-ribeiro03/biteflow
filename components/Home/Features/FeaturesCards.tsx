import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const FeatureCard = ({ desc, icon, title }: FeatureCardProps) => {
  return (
    <div className={`flex items-start bg-card p-4 rounded-xl gap-4 max-w-75`}>
      <div
        className={`rounded-xl bg-accent/30 row-span-2 p-4 flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold">{title}</p>
        <span className="max-w-40 text-center text-md">{desc}</span>
      </div>
    </div>
  );
};

export default FeatureCard;
