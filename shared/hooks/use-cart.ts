import { useEffect } from "react";
import { useCartStore } from "../store/cart";

export const useCart = () => {
  const {
    totalAmount,
    items,
    loading,
    updateItemQuantity,
    fetchCartItems,
    removeCartItem,
  } = useCartStore((state) => state);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type == "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return {
    onClickCountButton,
    totalAmount,
    items,
    loading,
    updateItemQuantity,
    removeCartItem,
  };
};
