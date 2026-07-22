import { Router } from 'express';
import { getPendingSuggestedLocations, reviewSuggestedLocation } from '../../controllers/admin/suggestedLocations.controller.js';
const router = Router();

router.get('/', getPendingSuggestedLocations);
router.patch('/:id', reviewSuggestedLocation);

export default router;