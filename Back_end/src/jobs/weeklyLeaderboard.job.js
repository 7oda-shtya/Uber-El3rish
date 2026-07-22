import cron from 'node-cron';
import { calculateWeeklyLeaderboard } from '../services/leaderboard.service.js';
import { getCurrentWeekStart } from '../utils/date.js';

cron.schedule('0 7 * * 6', async () => {
  console.log('بدأ حساب الليدربورد الأسبوعي...');

  const now = new Date();
  const justEndedWeekStart = new Date(getCurrentWeekStart(now));
  justEndedWeekStart.setDate(justEndedWeekStart.getDate() - 7);

  await calculateWeeklyLeaderboard('DRIVER', justEndedWeekStart);
  await calculateWeeklyLeaderboard('CLIENT', justEndedWeekStart);

  console.log('خلص الحساب.');
}, { timezone: 'Africa/Cairo' });