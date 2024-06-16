import { Router } from 'express';
import {
  deleteProductController,
  getProductsController,
  postProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { createProductsShema } from '../validation/products.js';

const router = Router();

router.get('/', ctrlWrapper(getProductsController));
router.post(
  '/',
  validateBody(createProductsShema),
  ctrlWrapper(postProductController),
);
router.delete('/:productId', ctrlWrapper(deleteProductController));

export default router;
