import moment, { Moment } from "moment";

import { DEFAULT_DATE_FORMAT, YYYY_MM_DD } from "constants/date";

export type DateRepresentation = string | Date | Moment;

/**
 * Get difference between dates.
 *
 * @returns {number}
 */
export function getDifferenceBetweenDates(
  startDate: string | Date | Moment | undefined | null,
  endDate: string | Date | Moment | undefined | null,
  unit: "days" | "months" | "years" = "days",
  showFloat = false
): number {
  return moment(endDate).diff(moment(startDate), unit, showFloat);
}

/**
 * Get formatted date.
 *
 * @param {string|Date} date
 * @param {string} [format = DEFAULT_DATE_FORMAT]
 * @returns {string}
 */
export function getFormattedDate(
  date?: string | Date | undefined | null,
  format = DEFAULT_DATE_FORMAT
) {
  return moment(date).format(format);
}

/**
 * Convert given date to moment object.
 */
export function getDate(date?: DateRepresentation, format = YYYY_MM_DD) {
  return moment(date).format(format);
}

/**
 * Checks if the date is between start and end date
 *
 * @example
 * isDateBetween('2021-01-01', '2020-12-31', '2021-01-02') // true
 * isDateBetween('2021-01-01', '2020-12-31', '2021-01-02', 'days', '()') // false
 */
export function isDateBetween(
  date: Date | Moment | string,
  startDate: Date | Moment | string,
  endDate: Date | Moment | string,
  granularity: moment.unitOfTime.DurationConstructor = "days",
  inclusivity: "()" | "(]" | "[)" | "[]" = "[]"
) {
  return moment(date).isBetween(startDate, endDate, granularity, inclusivity);
}

/**
 * Converts an ISO 8601 timestamp to a relative time string.
 * @param {string} timestamp - The ISO 8601 timestamp to be converted.
 * @returns {string} - A relative time string (e.g., "a day ago", "2 hours ago").
 */
export function getRelativeTime(timestamp: string): string {
  return moment(timestamp).fromNow();
}
