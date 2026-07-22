import { Router } from 'express';
import { getMyLeaderboardStatus } from '../../controllers/shared/leaderboard.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/leaderboard', authenticate, getMyLeaderboardStatus);

export default router;