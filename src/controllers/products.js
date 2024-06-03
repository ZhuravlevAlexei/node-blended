import createHttpError from 'http-errors';
import {
  createProduct,
  deleteProduct,
  getProducts,
} from '../services/products.js';

export const getProductsController = async (req, res, next) => {
  const products = await getProducts();
  res.status(200).json(products);
};
export const postProductController = async (req, res, next) => {
  const product = await createProduct(req.body);
  res.status(201).json(product);
};
export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);
  if (!product) {
    next(createHttpError('404', 'Not found'));
    return;
  }
  res.sendStatus(204);
};
