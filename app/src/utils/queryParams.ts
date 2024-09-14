/**
 *
 * Parses query to usable object
 *
 * @param {String} query
 */
export const parseQuery = (
  query: string,
  { convertToArray = false, typeConversion = false } = {}
) => {
  if (!query) {
    return {};
  }

  return query
    .substring(1, query.length)
    .split("&")
    .reduce((acc, curr) => {
      const [key, value] = curr.split("=");
      const convertedValue: string = value && value.replace(/%20/g, " ");

      if (!convertToArray || !convertedValue) {
        return {
          ...acc,
          [key]: convertedValue,
        };
      }

      if (!value.includes(",")) {
        return {
          ...acc,
          [key]: typeConversion
            ? Number(convertedValue) || convertedValue
            : convertedValue,
        };
      }

      const valueInArray = convertedValue.split(",");

      if (!typeConversion) {
        return {
          ...acc,
          [key]: valueInArray,
        };
      }

      const typeConverted = valueInArray.map((item) => Number(item) || item);

      return {
        ...acc,
        [key]: typeConverted,
      };
    }, {});
};

type ParsingType = { [key: string]: string | number | string[] | number[] };

/**
 *
 * Unparses object to query
 *
 * @param object
 */
export const unParseQuery = (object: ParsingType) => {
  return Object.keys(object)
    .reduce((acc, curr) => {
      return object[curr] ? `${acc}${curr}=${object[curr]}&` : acc;
    }, "?")
    .slice(0, -1);
};
