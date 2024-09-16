import Joi from 'joi';

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  countryId: Joi.number().required(),
  department: Joi.string().required(),
  designationId: Joi.number().required(),
  password: Joi.string().min(8).max(20).required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  department: Joi.string().required(),
  designationId: Joi.number().required(),
  managerId: Joi.number().optional(),
  roleIds: Joi.array().items(Joi.number().required()).required(),
  excludeIds: Joi.string().optional(),
});

export const fetch = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  size: Joi.number().integer().min(1).max(40).default(40),
});

export const create = Joi.object({
  userId: Joi.number().required(),
  meal_type: Joi.string().required(),
});
