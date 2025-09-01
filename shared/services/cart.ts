import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity }))
    .data;
};

export const deleteItemCart = async (ItemId: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>("/cart/" + ItemId)).data;
};

export const addItemCart = async (
  values: CreateCartItemValues
): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>("/cart", values)).data;
};
