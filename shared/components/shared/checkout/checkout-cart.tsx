"use-client";

import { pizzaSize, pizzaType } from "@/shared/constants/pizza";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  removeCartItem: (id: number) => void;
  className?: string;
  loading: boolean;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  className,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index}/>)
          : items.map((item) => (
              <CheckoutItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as pizzaType,
                  item.pizzaSize as pizzaSize
                )}
                disabled={item.disabled}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
