import { ACCESS_TOKEN } from "constants/common";

import * as storage from "./storage";

export function getAccessToken(): string {
  return storage.get(ACCESS_TOKEN) || "";
}

export function setAccessToken(accessToken: string) {
  storage.set(ACCESS_TOKEN, accessToken);
}

export function clear() {
  storage.remove(ACCESS_TOKEN);
}
