export const removeFalseValue = (object: object) => {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!value) {
      return { ...acc };
    }

    return { ...acc, [key]: value };
  }, {});
};
