import {
  Cart,
  CartItem,
  Ingredient,
  Order,
  Product,
  ProductItem,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

export interface usersOrders{
  id: number,
  totalAmount: number,
  address: string,
  items: JSON,
  updatedAt: Date
}
