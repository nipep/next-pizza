"use client";

import { ProductWithRelation } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelation;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const { addCartItem, loading } = useCartStore();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const onSubmit = (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      addCartItem({
        productItemId: itemId,
        ingredients,
      });
      toast.success(
        isPizzaForm
          ? product.name + " пицца добавлена в корзину"
          : product.name + " добавлен в корзину"
      );

      _onSubmit?.();
    } catch (err) {
      toast.error("Не удалось добавить пиццу в корзину");
      console.log(err);
    }
  };
  {
    if (isPizzaForm) {
      return (
        <ChoosePizzaForm
          onClickAddCart={onSubmit}
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
          loading={loading}
        />
      );
    }
    return (
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        price={firstItem.price}
        onClickAdd={onSubmit}
        loading={loading}
      />
    );
  }
};
