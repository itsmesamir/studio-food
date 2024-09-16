import { buildUrl } from "utils/string";
import http from "./http";
import api from "constants/api";
import { Any } from "types/common";

export async function fetchOrders(
  params: Any,
  signal?: AbortSignal
): Promise<Order[]> {
  const url = buildUrl(api.order.orders);

  const { data } = await http.get(url, { signal, params });

  return data;
}
