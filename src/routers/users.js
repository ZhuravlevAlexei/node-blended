import { Router } from 'express';
import { validateBody } from '../utils/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/users.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginController, signupController } from '../controllers/users.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerUserSchema),
  ctrlWrapper(signupController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginController),
);
router.post('/logout');
router.get('/current');

export default router;
