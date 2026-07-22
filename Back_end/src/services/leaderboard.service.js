import { prisma } from '../db.js';

const BONUS_AMOUNTS = {
  1: 100,
  2: 75,
  3: 50,
};
const DEFAULT_TOP10_BONUS = 20;

function getBonusForRank(rank) {
  return BONUS_AMOUNTS[rank] ?? DEFAULT_TOP10_BONUS;
}

export async function calculateWeeklyLeaderboard(role, weekStart) {
  const fullWeekEnd = new Date(weekStart);
  fullWeekEnd.setDate(fullWeekEnd.getDate() + 7);

  const idField = role === 'DRIVER' ? 'driverId' : 'clientId';

  const tripCounts = await prisma.trip.groupBy({
    by: [idField],
    where: { status: 'COMPLETED', createdAt: { gte: weekStart, lt: fullWeekEnd }, [idField]: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: 10,
  });

  await Promise.all(
    tripCounts.map(async (entry, index) => {
      const rank = index + 1;
      const userId = entry[idField];
      const bonusAmount = getBonusForRank(rank);

      const existing = await prisma.weeklyLeaderboard.findUnique({
        where: { userId_weekStart_role: { userId, weekStart, role } },
      });

      const alreadyBonused = existing?.bonusGiven ?? false;

      await prisma.$transaction(async (tx) => {
        await tx.weeklyLeaderboard.upsert({
          where: { userId_weekStart_role: { userId, weekStart, role } },
          create: {
            userId, role, weekStart, weekEnd: fullWeekEnd,
            tripCount: entry._count.id, rank, bonusAmount,
            bonusGiven: false,
          },
          update: {
            tripCount: entry._count.id, rank, bonusAmount,
          },
        });

        if (!alreadyBonused) {
          await tx.user.update({
            where: { id: userId },
            data: { wallet: { increment: bonusAmount } },
          });
          await tx.weeklyLeaderboard.update({
            where: { userId_weekStart_role: { userId, weekStart, role } },
            data: { bonusGiven: true },
          });
        }
      });
    })
  );
}