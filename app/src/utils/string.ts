import { Any } from "types/common";

/**
 * Build a Url removing multiple slashes and trailing slash.
 *
 * @example
 * buildUrl('http://localhost:3000', 'api', 'v1', 'users', '1') // http://localhost:3000/api/v1/users/1
 * buildUrl('http://localhost:3000/', '//api/', '/v1/', '///users///', '//1////') // http://localhost:3000/api/v1/users/1
 *
 * buildUrl('google.com', 'searchText') // google.com/searchText
 * buildUrl('google.com', '/searchText') // google.com/searchText
 * buildUrl('google.com/', '/searchText') // google.com/searchText
 * buildUrl('//google.com/', '/searchText') // //google.com/searchText
 * buildUrl('https://google.com/', '/searchText') //  https://google.com/searchText
 * buildUrl('http://google.com/', '/searchText') // http://google.com/searchText
 * buildUrl("http://google.com/", "/searchText?redirectUrl=https://google.com"); // http://google.com/searchText?redirectUrl=https://google.com
 */
export function buildUrl(...routes: Array<string | URL | number>): string {
  return routes
    .join("/")
    .replace(/(https?:\/\/|^\/\/)|(\/)+/g, "$1$2") // remove double slashes
    .replace(/\/+$/, ""); // remove trailing slash
}

/**
 * Join string
 * @param {String} string
 * @returns {String}
 * @example joinStrings('Hello','world',3,10)
 * @return 'Helloworld310'
 */
export const joinStrings = (...strings: Any[]) => {
  return strings.join("");
};
