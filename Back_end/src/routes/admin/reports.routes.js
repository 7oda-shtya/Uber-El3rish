import { Router } from 'express';
import { getPendingReports, getRejectedReports, getAcceptedReports, getReport, checkReport } from '../../controllers/admin/reports.controller.js';

const router = Router();

router.get('/pending', getPendingReports);
router.get('/rejected', getRejectedReports);
router.get('/accepted', getAcceptedReports);
router.get('/:id', getReport);
router.patch('/:id/check', checkReport);

export default router;