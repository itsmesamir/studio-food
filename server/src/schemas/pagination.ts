import Joi from 'joi';

// Pagination validation schema
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Page must be a number',
    'number.min': 'Page must be at least 1',
  }),
  size: Joi.number().integer().min(1).optional().messages({
    'number.base': 'Page size must be a number',
    'number.min': 'Page size must be at least 1',
  }),
});
