import { ApiRoutes } from "./constants";
import { usersOrders } from "./dto/cart.dto";
import { axiosInstance } from "./instance";

export const getUsersOrders = async (): Promise<usersOrders[]> => {
  return (await axiosInstance.get<usersOrders[]>(ApiRoutes.ORDERS)).data;
};
