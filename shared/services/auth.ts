import { User } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getMe = async () => {
  const { data } = await axiosInstance.get<User>(ApiRoutes.AUTH);

  return data;
};
