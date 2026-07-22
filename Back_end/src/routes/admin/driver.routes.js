import { Router } from 'express';
import { getPendingDrivers, reviewDriver } from '../../controllers/admin/driver.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

router.get('/drivers/pending', authenticate, requireRole('ADMIN'), getPendingDrivers);
router.patch('/drivers/:id/review', authenticate, requireRole('ADMIN'), reviewDriver);

export default router;