import Joi from 'joi';
const transactionTypes = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
};
export const transactionValidator = Joi.object({
  userId: Joi.string().uuid({ version: 'uuidv4' }).required().messages({
    'any.required': 'userId is required',
    'string.guid': 'userId.must.be.a.valid.uuid',
  }),
  amount: Joi.number().greater(0).required().messages({
    'any.required': 'amount.is.required',
    'number.base': 'amount.must.be.a.number',
    'number.greater': 'amount.must.be.greater.than.zero',
  }),
  type: Joi.string()
    .valid(...Object.values(transactionTypes))
    .required()
    .messages({
      'any.required': 'type.is.required',
      'string.base': 'type.must.be.a.string',
      'any.only': 'type.must.be.a.valid.transaction.type',
    }),
});
