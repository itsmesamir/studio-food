import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from 'constants/date';

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
