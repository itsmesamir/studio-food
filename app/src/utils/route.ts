import { interpolate } from "./interpolate";

export function createRoute(
  routes: string[],
  params: { [key: string]: string | number } = {}
): string {
  if (routes.length === 0) {
    return "/";
  }

  const cleanedRoutes = routes.map((route) => {
    return route.startsWith("/") ? route.substring(1) : route;
  });

  const path = cleanedRoutes.join("/");
  const interpolatedPath = interpolate(path, params);

  return `/${interpolatedPath}`;
}
