"use client";
import { cn } from "@/shared/lib/utils";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { ProductWithRelation } from "@/@types/prisma";
import { GroupVariant } from "./group-variant";
import {
  mapPizzaType,
  pizzaSize,
  pizzaSizes,
  pizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { useEffect, useState } from "react";
import { useSet } from "react-use";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredientItem";
import { CalcTotalPizzasPrice } from "@/shared/lib/calc-total-pizzas-price";
import { getAvailablePizzasVariants } from "@/shared/lib/get-available-pizzas-variants";
import { UseAvailablePizzasVariants } from "@/shared/hooks/use-available-pizzas-variants";
import { GetPizzaTotalPrice } from "@/shared/lib/get-pizza-total-price";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onClickAddCart: (itemId: number, ingredients: number[]) => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onClickAddCart,
}) => {
  const {
    size,
    type,
    setSize,
    setType,
    selectedIngredientsIds,
    toggleAddIngredient,
    availablePizzasSize,
    currentItemdId,
  } = UseAvailablePizzasVariants(items);

  const { totalPrice, textDetaills } = GetPizzaTotalPrice(
    items,
    size,
    type,
    ingredients,
    selectedIngredientsIds,
    name
  );

  const handleClickAdd = () => {
    if (currentItemdId) {
      onClickAddCart(currentItemdId, Array.from(selectedIngredientsIds));
    }
  };

  return (
    <div
      className={cn(
        className,
        "flex flex-1 flex-col md:flex-row items-center relative"
      )}
    >
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className="w-full sm:w-[490px] bg-[#f1f1f1] sm:p-7 p-2">
        <Title
          text={name}
          className="font-extrabold mb-1 sm:mb-3 md:text-[26px] text-[22px]"
        />
        <p className="text-gray-400 mb-1 sm:mb-3 md:text-[16px] text-[13px]">
          {textDetaills}
        </p>
        <div className="flex flex-col mb-1 sm:mb-3 sm:items-stretch items-center">
          <GroupVariant
            className="mb-1"
            items={availablePizzasSize}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as pizzaSize)}
          />
          <GroupVariant
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as pizzaType)}
          />
        </div>
        <div className="bg-gray-50 sm:p-5 p-2 rounded-md h-[120px] sm:h-[400px] overflow-auto scrollbar mb-3">
          <div className="grid grid-cols-3 gap-3 ">
            {ingredients.map((item) => (
              <IngredientItem
                key={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                onClick={() => toggleAddIngredient(item.id)}
                active={selectedIngredientsIds.has(item.id)}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
          loading={loading}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
