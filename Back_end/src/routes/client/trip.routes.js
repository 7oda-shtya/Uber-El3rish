import { Router } from 'express';
import { RequestTrip, cancelTrip, acceptOffer, endTrip, getPendingTripOffers, getMyTrips } from '../../controllers/client/trip.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { checkPendingFine } from '../../middlewares/fine.middleware.js';
import { requireAccountStatus } from '../../middlewares/accountStatus.middleware.js';

const router = Router();

router.post('/trips', checkPendingFine, requireAccountStatus, RequestTrip);
router.patch('/trips/:tripId/cancel', cancelTrip);
router.patch('/offers/:offerId/accept', acceptOffer);
router.patch('/trips/:tripId/end', endTrip);
router.get('/trips', getMyTrips);
router.get('/trips/:tripId/offers', getPendingTripOffers);

export default router;