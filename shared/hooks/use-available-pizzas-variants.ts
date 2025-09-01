import { useEffect, useState } from "react";
import { Variant } from "../components/shared/group-variant";
import { pizzaSize, pizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzasVariants } from "../lib/get-available-pizzas-variants";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: pizzaSize;
  type: pizzaType;
  setSize: (size: pizzaSize) => void;
  setType: (type: pizzaType) => void;
  selectedIngredientsIds: Set<number>;
  toggleAddIngredient: (id: number) => void;
  availablePizzasSize: Variant[];
  currentItemdId?: number;
}

export const UseAvailablePizzasVariants = (
  items: ProductItem[]
): ReturnProps => {
  const [size, setSize] = useState<pizzaSize>(25);
  const [type, setType] = useState<pizzaType>(1);
  const [selectedIngredientsIds, { toggle: toggleAddIngredient }] =
    useSet<number>(new Set([]));

  const availablePizzasSize = getAvailablePizzasVariants(type, items);

  const currentItemdId = items.find(
    (item) => item.pizzaType == type && item.size == size
  )?.id;

  useEffect(() => {
    const availableSize = availablePizzasSize?.find((item) => !item.disabled);
    const isAvailableSize = availablePizzasSize?.find(
      (item) => Number(item.value) == size && !item.disabled
    );

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as pizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredientsIds,
    toggleAddIngredient,
    availablePizzasSize,
    currentItemdId
  };
};
