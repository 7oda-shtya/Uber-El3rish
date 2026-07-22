import { Router } from 'express';
import authRoutes from './auth.routes.js';
import tripRoutes from './trip.routes.js';
import savedTripsRoutes from './savedTrips.routes.js';
import suggestedLocationsRoutes from './suggestLocation.route.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authRoutes);
router.use(authenticate, tripRoutes);
router.use(authenticate, savedTripsRoutes);
router.use(authenticate, suggestedLocationsRoutes);

export default router;