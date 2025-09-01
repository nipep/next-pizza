import { Cart } from "@prisma/client";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import { CartDTO,} from "../services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number ;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  disabled?: boolean;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    // исправить баг с price 
    price: calcCartItemTotalPrice(item),
    // price: item.productItem.price,
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];
  return {
    items,
    totalAmount: data.totalAmount,
  };
};
