import { remove, set } from "utils/storage";

import { Any } from "types/common";

export function handleLogin({ accessToken, refreshToken }: Any) {
  set("accessToken", accessToken);
  set("refreshToken", refreshToken);
}

export function handleLogout() {
  remove("accessToken");
  remove("refreshToken");

  window.location.reload();
}
