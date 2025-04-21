import * as Joi from 'joi';

export const CreateProductModelValidation = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required(),
})
