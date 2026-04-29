import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

const SearchIngredient = () => {
  return (
    <div className="flex items-center gap-3">
      <SearchIcon className="text-sm" />
      <Input placeholder="Buscar ingrediente..." />
    </div>
  );
};

export default SearchIngredient;
