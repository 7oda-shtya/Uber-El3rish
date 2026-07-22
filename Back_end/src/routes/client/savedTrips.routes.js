import { Router } from 'express';
import { getSavedTrips, addLocationToSavedTrips, deleteSavedTrip } from '../../controllers/client/savedTrips.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/saved-trips', authenticate, getSavedTrips);
router.post('/saved-trips', authenticate, addLocationToSavedTrips);
router.delete('/saved-trips/:id', authenticate, deleteSavedTrip);

export default router;