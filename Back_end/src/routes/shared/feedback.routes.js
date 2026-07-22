import { makeReport, getSentReports, getReceivedReports, makeRate, getSentRates, getReceivedRates, support } from '../../controllers/shared/feedback.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/trips/:tripId/report', makeReport);
router.get('/reports/sent', getSentReports);
router.get('/reports/received', getReceivedReports);
router.post('/trips/:tripId/rate', makeRate);
router.get('/rates/sent', getSentRates);
router.get('/rates/received', getReceivedRates);
router.post('/support', support);

export default router;