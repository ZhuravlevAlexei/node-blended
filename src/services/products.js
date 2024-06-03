import { Product } from '../db/model/model.js';
export const getProducts = () => Product.find();

export const createProduct = (payload) => Product.create(payload);
export const deleteProduct = (productId) =>
  Product.findByIdAndDelete(productId);
