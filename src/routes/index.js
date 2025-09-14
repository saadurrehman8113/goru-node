import { Router } from 'express';
import authRouter from './auth.routes.js';
import usersRouter from './users.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ version: 'v1' });
});

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
