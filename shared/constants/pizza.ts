import exp from "constants";

export const mapPizzaSize = {
  25: "Маленькая",
  30: "Средная",
  35: "Большая",
} as const;

export const mapPizzaType = {
  1: "традиционное",
  2: "тонкое",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value,
  }));

export type pizzaType = keyof typeof mapPizzaType;
export type pizzaSize = keyof typeof mapPizzaSize;
