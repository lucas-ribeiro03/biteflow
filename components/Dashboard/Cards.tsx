type CardProps = {
  name: string;
  stat: string;
  statType: "money" | "number";
  icon: React.ReactNode;
};

const Cards = ({ name, stat, statType, icon }: CardProps) => {
  return (
    <div className="flex flex-col gap-3 items-start bg-card border border-border rounded-lg p-3 w-80 justify-center">
      <div className="flex items-center gap-2 text-lg">
        <span className="p-2 w-10 h-10 bg-accent/30 flex items-center justify-center rounded-full">
          {icon}
        </span>
        <h1>{name}</h1>
      </div>
      <span className="text-4xl ml-4">
        {statType === "money" ? `$ ${stat}` : stat}
      </span>
    </div>
  );
};

export default Cards;
