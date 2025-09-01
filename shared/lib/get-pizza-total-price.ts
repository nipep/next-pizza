import { Ingredient, ProductItem } from "@prisma/client";
import { CalcTotalPizzasPrice } from "./calc-total-pizzas-price";
import { mapPizzaType, pizzaSize, pizzaType } from "../constants/pizza";

export const GetPizzaTotalPrice = (
  items: ProductItem[],
  size: pizzaSize,
  type: pizzaType,
  ingredients: Ingredient[],
  selectedIngredientsIds: Set<number>,
  name: string
) => {
  const textDetaills = `${name}, ${mapPizzaType[type]} тесто, ${size} см`;

  const totalPrice = CalcTotalPizzasPrice(
    type,
    size,
    selectedIngredientsIds,
    items,
    ingredients
  );

  return { totalPrice, textDetaills };
};
