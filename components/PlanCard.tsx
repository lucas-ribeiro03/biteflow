type PlanCardProps = {
  name: string;
  price: number;
  benefits: string[];
  badge?: string;
  badgeVariant?: "success" | "secondary";
  selected?: boolean;
  nameColor?: string;
  opacity?: boolean;
} & React.ComponentProps<"div">;

const PlanCard = ({
  name,
  price,
  benefits,
  badge,
  badgeVariant = "secondary",
  selected = false,
  nameColor = "text-foreground",
  opacity = false,
  ...props
}: PlanCardProps) => {
  const badgeClass =
    badgeVariant === "success"
      ? "bg-success/20 text-success"
      : "bg-amber-700/60 text-amber-500";

  const borderClass = selected
    ? "border-2 border-primary"
    : nameColor === "text-secondary"
      ? "border border-secondary"
      : "border border-border";

  return (
    <div
      {...props}
      className={`bg-card ${borderClass} rounded-xl p-4 cursor-pointer ${opacity ? "opacity-75" : ""}`}
    >
      {badge ? (
        <span
          className={`text-[10px] font-semibold ${badgeClass} rounded px-2 py-0.5 inline-block mb-2`}
        >
          {badge}
        </span>
      ) : (
        <div className="mb-5.5" />
      )}
      <h3 className={`font-bold ${nameColor} mb-1`}>{name}</h3>
      <p className="text-xl font-bold text-foreground mb-3">
        {price === 0 ? "R$0" : `R$${price}`}
        <span className="text-xs font-normal text-muted-foreground">/mês</span>
      </p>
      <div className="h-px bg-border mb-3" />
      <ul className="flex flex-col gap-2">
        {benefits.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-[11px] text-muted-foreground"
          >
            <svg
              className={`w-3 h-3 mt-0.5 shrink-0 ${selected ? "stroke-amber-600" : "stroke-muted-foreground"}`}
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;
