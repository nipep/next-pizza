import { mapPizzaType } from "@/shared/constants/pizza";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccess: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку! Заказ № {orderId}</h1>

    <hr />

    <p>Ваш заказ № {orderId} оплачен. Список товаров:</p>
    {}
    <ul>
      {items.map((item) =>
        item.productItem.size ? (
          <li key={item.id}>
            {item.productItem.product.name} {item.productItem.size} {" см "}
            {
              mapPizzaType[
                item.productItem.pizzaType as keyof typeof mapPizzaType
              ]
            }
            {" тесто "}
            {item.ingredients
              ? "(" +
                item.ingredients.map((ingredient) => ` ${ingredient.name}`) +
                ")"
              : " "}{" "}
            |{" "}
            {item.ingredients.reduce(
              (sum, ingredient) => sum + ingredient.price,
              0
            ) + item.productItem.price}{" "}
            ₽ x {item.quantity} шт. ={" "}
            {(item.ingredients.reduce(
              (sum, ingredient) => sum + ingredient.price,
              0
            ) +
              item.productItem.price) *
              item.quantity}{" "}
            ₽
          </li>
        ) : (
          <li key={item.id}>
            {item.productItem.product.name} | {item.productItem.price} ₽ x{" "}
            {item.quantity} шт. = {item.productItem.price * item.quantity} ₽
          </li>
        )
      )}
    </ul>
  </div>
);
