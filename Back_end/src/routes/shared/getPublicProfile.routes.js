import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { getPublicProfile } from '../../controllers/shared/getPublicProfile.controller.js';

const router = Router();

router.get('/users/:id/public-profile', authenticate, getPublicProfile);

export default router;