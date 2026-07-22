import 'dotenv/config';
import app from './src/app.js';
import './src/jobs/weeklyLeaderboard.job.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`السيرفر شغال على بورت ${PORT}`);
});