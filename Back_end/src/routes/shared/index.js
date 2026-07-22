import { Router } from 'express';
import { authenticate } from '../../middlewares/auth.middleware.js';
import publicProfileRoutes from './getPublicProfile.routes.js';
import leaderboardRoutes from './leaderboard.routes.js';
import feedbackRoutes from './feedback.routes.js';

const router = Router();

router.use(authenticate, publicProfileRoutes);
router.use(authenticate, leaderboardRoutes);
router.use(authenticate, feedbackRoutes);

export default router;