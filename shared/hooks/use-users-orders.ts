import { useEffect, useState } from "react";
import { Api } from "../services/api-client";

export const useUsersOrders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUsersOrders() {
      try {
        setLoading(true);
        const orders = await Api.usersOrders.getUsersOrders();
        setOrders(orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsersOrders();
  }, []);
  return {
    orders,
    loading,
  };
};
