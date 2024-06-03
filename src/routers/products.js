import { Router } from 'express';
import {
  deleteProductController,
  getProductsController,
  postProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

router.get('/', ctrlWrapper(getProductsController));
router.post('/', ctrlWrapper(postProductController));
router.delete('/:productId', ctrlWrapper(deleteProductController));

export default router;
