import { Router } from 'express';
import reportsRoutes from './reports.routes.js';
import driverRoutes from './driver.routes.js';
import suggestedLocationsRoutes from './suggestedLocations.routes.js';

const router = Router();
router.use('/drivers', driverRoutes);
router.use('/reports', reportsRoutes);
router.use('/suggested-locations', suggestedLocationsRoutes);

export default router;