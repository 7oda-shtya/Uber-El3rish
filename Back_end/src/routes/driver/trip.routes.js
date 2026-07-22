import { Router } from 'express';
import { makeOffer, getTrips, cancelOffer } from '../../controllers/driver/trip.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';
import { requireAccountStatus } from '../../middlewares/accountStatus.middleware.js';

const router = Router();

router.get('/trips', authenticate, requireRole('DRIVER'), requireAccountStatus, getTrips);
router.post('/trips/:tripId/offer', authenticate, requireRole('DRIVER'), requireAccountStatus, makeOffer);
router.patch('/offers/:offerId/cancel', authenticate, requireRole('DRIVER'), cancelOffer);

export default router;