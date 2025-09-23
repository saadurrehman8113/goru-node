import { Router } from 'express';
import authRouter from './auth.routes.js';
import usersRouter from './users.routes.js';
import productsRouter from './products.routes.js';
import paymentsRouter from './payments.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ version: 'v1' });
});

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/payments', paymentsRouter);

export default router;
