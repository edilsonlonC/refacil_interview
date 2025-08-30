import Joi from 'joi';

export const userParamsValidator = Joi.object({
  id: Joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'any.required': 'id is required',
    'string.guid': 'id.must.be.a.valid.uuid',
  }),
});

export const transactionParamsValidator = Joi.object({
  userId: Joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'any.required': 'userId is required',
    'string.guid': 'userId.must.be.a.valid.uuid',
  }),
});
