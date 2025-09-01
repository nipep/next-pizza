import { ProductItem } from "@prisma/client";
import { pizzaSizes, pizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variant";

export const getAvailablePizzasVariants = (type: pizzaType, items: ProductItem[]) : Variant[] => {
      const filterPizzasByType = items.filter((item) => item.pizzaType == type);
    
    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filterPizzasByType.some((pizza) => Number(pizza.size) == Number(item.value)),
    }));
}