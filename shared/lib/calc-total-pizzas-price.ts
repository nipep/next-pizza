import { Ingredient, ProductItem } from "@prisma/client";
import { pizzaSize, pizzaType } from "../constants/pizza";

export const CalcTotalPizzasPrice = (type: pizzaType, size: pizzaSize, selectedIngredientsIds: Set<number>, items: ProductItem[], ingredients: Ingredient[]) => {

  
    const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === type)
      ?.price || 0;

  const ingredientsPrice = ingredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((sum, ingredient) => sum + ingredient.price, 0);

  const totalPrice = pizzaPrice + ingredientsPrice;
  return totalPrice;
};
