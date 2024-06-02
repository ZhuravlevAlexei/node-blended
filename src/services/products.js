import { Product } from '../db/model/model.js';
export const getProducts = () => Product.find();
