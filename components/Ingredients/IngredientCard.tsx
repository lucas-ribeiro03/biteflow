"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { StarIcon } from "lucide-react";

type IngredientCardProps = {
  ingredientId: string;
  name: string;
  isTemplate: boolean;
  nicheSuggest?: string;
  tenantId: string;
};

const IngredientCard = ({
  ingredientId,
  name,
  isTemplate,
  nicheSuggest,
}: IngredientCardProps) => {
  const { getValues, setValue } = useFormContext();

  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const updateForm = (
    checked: boolean,
    newQuantity: string,
    newUnit: string,
  ) => {
    const current: {
      id: string;
      name: string;
      unit: string;
      quantity: string;
    }[] = getValues("ingredients") ?? [];

    if (!checked) {
      // Remove o ingrediente da lista
      setValue(
        "ingredients",
        current.filter((i) => i.id !== ingredientId),
        { shouldValidate: true },
      );
      return;
    }

    const entry = {
      id: ingredientId,
      name,
      unit: newUnit,
      quantity: newQuantity,
    };
    const exists = current.find((i) => i.id === ingredientId);

    setValue(
      "ingredients",
      exists
        ? current.map((i) => (i.id === ingredientId ? entry : i)) // atualiza se já existe
        : [...current, entry], // adiciona se não existe
      { shouldValidate: true },
    );
  };

  const isChecked = () =>
    (getValues("ingredients") ?? []).some(
      (i: { id: string }) => i.id === ingredientId,
    );

  return (
    <div className="grid grid-cols-4 items-center justify-center py-2">
      <div className="grid grid-cols-2">
        <span className="col-span-2 relative flex w-fit">
          {name}
          {isTemplate && (
            <span className="text-xs" title="Recomendado">
              <StarIcon className="fill-amber-400 text-transparent w-2 absolute -top-0.5 -right-3" />
            </span>
          )}
        </span>
        {nicheSuggest && <span className="text-xs">{nicheSuggest}</span>}
      </div>

      <div className="flex justify-center">
        <Input
          className="max-w-12 text-center"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            if (isChecked()) updateForm(true, e.target.value, unit);
          }}
        />
      </div>

      <Select
        value={unit}
        onValueChange={(val) => {
          setUnit(val);
          if (isChecked()) updateForm(true, quantity, val);
        }}
      >
        <div className="flex justify-center">
          <SelectTrigger
            className="w-full"
            title="Selecionar unidade de medida"
          >
            <SelectValue placeholder="Unidade" />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectItem value="unidade">Unidade</SelectItem>
          <SelectItem value="gramas">g</SelectItem>
          <SelectItem value="outro">Outro</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex justify-center">
        <Checkbox
          id={`ingredient-${ingredientId}`}
          onCheckedChange={(checked) => updateForm(!!checked, quantity, unit)}
        />
      </div>
    </div>
  );
};

export default IngredientCard;
