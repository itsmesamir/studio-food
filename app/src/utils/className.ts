import classnames from "clsx";
import config from "config";
import { overrideTailwindClasses } from "tailwind-override";

import { Any } from "types/common";

/**
 * Generates a class name with the application prefix.
 *
 * @param baseClass - The base class name to be prefixed.
 * @returns The class name with the application prefix.
 * @example
 *
 * getClassName('select'); // Returns 'myApp-select'
 */

export function getClassName(baseClass: string): string {
  return `${config.app.classPrefix}-${baseClass}`;
}

export const classNames = (...args: Any) =>
  overrideTailwindClasses(classnames(...args));
