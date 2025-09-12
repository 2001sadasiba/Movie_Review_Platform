import { Router } from 'express';
import UserRoutes from './users.api';
import MovieRoutes from './movie.api';

const router = Router();

// Base route: /api/v1/customers
router.use('/users', UserRoutes);
router.use('/movies', MovieRoutes);

export default router;
