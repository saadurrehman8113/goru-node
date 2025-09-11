import { Router } from 'express';
import usersRouter from '../../modules/users/user.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ version: 'v1' });
});

router.use('/users', usersRouter);

export default router;
