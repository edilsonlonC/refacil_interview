import Joi from 'joi';

export const transactionValidator = Joi.object({
  userId: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().required(),
});
