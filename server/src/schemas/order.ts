import Joi from 'joi';

export const fetch = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  size: Joi.number().integer().min(1).max(40).default(40),
});
