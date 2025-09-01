import { ingredients } from "@/prisma/constant";
import { mapPizzaType, pizzaSize, pizzaType } from "../constants/pizza";
import { Ingredient } from "@prisma/client";
import { CartStateItem } from "./get-cart-details";

export const getCartItemDetails = (
  ingredient: CartStateItem["ingredients"],
  pizzaType?: pizzaType,
  pizzaSize?: pizzaSize
): string => {
  const details = [];
  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }
  if (ingredients) {
    details.push(...ingredient.map((ingredient) => ingredient.name));
  }
  return details.join(", ");
};
