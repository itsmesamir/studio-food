import { useQuery } from "@tanstack/react-query";

import { Any, DefaultObject } from "types/common";

import queryKey from "constants/queryKey";
import { fetchOrders } from "services/orders";

export const useOrdersQuery = (params?: DefaultObject) => {
  const ordersQuery = useQuery({
    queryKey: [queryKey.cafes],
    queryFn: ({ signal }: Any) => fetchOrders(params, signal),
    enabled: !!params,
  });

  return ordersQuery;
};
