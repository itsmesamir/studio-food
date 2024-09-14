/**
 * Get cookie.
 *
 * @param {String} key : whose value to get.
 */
export function get(key: string) {
  return localStorage.getItem(key);
}

/**
 * Set cookie.
 *
 * @param {String} key : whose Value to set.
 * @param {*} value : Value to set.
 */
export function set(key: string, value: string) {
  localStorage.setItem(key, value);
}

/**
 * Remove key value pair in storage.
 *
 * @param {string} key
 */
export function remove(key: string) {
  localStorage.setItem(key, "");
}
