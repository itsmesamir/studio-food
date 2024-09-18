import Joi, { CustomHelpers } from 'joi';

export const commaSeparatedNumbers = (fieldName: string) =>
  Joi.string()
    .pattern(/^[0-9]+(,[0-9]+)*$/, 'comma-separated numbers')
    .optional()
    .custom((value, helpers) => {
      const values = value.split(',').map(Number);

      if (values.some(isNaN)) {
        return helpers.error('any.invalid'); // Custom error key
      }

      return values;
    })
    .messages({
      'string.pattern.name': `${fieldName} must be a comma-separated list of numbers`,
      'any.invalid': `${fieldName} contains invalid numbers`,
    });

// Generic custom validation function for comma-separated strings
export const commaSeparatedEnumValidator = (enumValues: readonly string[]) => {
  return (value: string, helpers: CustomHelpers) => {
    const valuesArray = value.split(',').map(item => item.trim());
    const { error } = Joi.array()
      .items(Joi.string().valid(...enumValues))
      .validate(valuesArray);
    if (error) {
      return helpers.error('any.invalid');
    }
    return valuesArray;
  };
};
