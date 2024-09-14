import { buildUrl } from "utils/string";
import { interpolate } from "utils/interpolate";

import { Any, DefaultObject } from "types/common";
// import { User } from "types/User";

import api from "constants/api";
import http from "./http";

export async function fetchUsers(
  params: Any,
  signal?: AbortSignal
): Promise<DefaultObject[]> {
  const url = buildUrl(api.users);

  const { data } = await http.get(url, { signal, params });

  return data;
}

export async function fetchUserById(
  id: number,
  params: Any,
  signal?: AbortSignal
): Promise<DefaultObject> {
  const url = buildUrl(api.users, id);

  const { data } = await http.get(url, { signal, params });

  return data;
}

// export async function updateUserById(
//   id: number,
//   body: Any,
//   signal?: AbortSignal
// ): Promise<User[]> {
//   const url = buildUrl(api.users, id);

//   const { data } = await http.put(url, body, { signal });

//   return data;
// }

// export async function fetchUserRoles(
//   id: number,
//   signal?: AbortSignal
// ): Promise<User[]> {
//   const url = buildUrl(interpolate(api.userRoles, { id }));

//   const { data } = await http.get(url, { signal });

//   return data;
// }

// export async function addUserRoles(
//   id: number,
//   body: Any,
//   signal?: AbortSignal
// ): Promise<User[]> {
//   const url = buildUrl(interpolate(api.userRoles, { id }));

//   const { data } = await http.post(url, body, { signal });

//   return data;
// }
