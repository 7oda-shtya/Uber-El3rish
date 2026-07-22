import { Router } from 'express';
import authRoutes from './auth.routes.js';
import tripRoutes from './trip.routes.js';

const router = Router();

router.use(authRoutes);
router.use(tripRoutes);

export default router;