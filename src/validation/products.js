import Joi from 'joi';

export const createProductsShema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().valid('books', 'electronics', 'clothing', 'other'),
  description: Joi.string(),
});
