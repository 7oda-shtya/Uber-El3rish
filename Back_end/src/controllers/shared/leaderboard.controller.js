import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { getCurrentWeekStart } from '../../utils/date.js';

async function getLiveCurrentWeekRanking(role, userId) {
  const weekStart = getCurrentWeekStart();
  const idField = role === 'DRIVER' ? 'driverId' : 'clientId';

  const grouped = await prisma.trip.groupBy({
    by: [idField],
    where: { status: 'COMPLETED', createdAt: { gte: weekStart }, [idField]: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  });

  const rankedIds = grouped.map((g) => g[idField]);
  const myIndex = rankedIds.indexOf(userId);

  const top10Ids = rankedIds.slice(0, 10);
  const top10Users = await prisma.user.findMany({
    where: { id: { in: top10Ids } },
    select: { id: true, name: true, avatar: true },
  });

  const top10 = top10Ids.map((id, i) => ({
    ...top10Users.find((u) => u.id === id),
    tripCount: grouped[i]._count.id,
    rank: i + 1,
  }));

  return {
    weekStart,
    top10,
    myRank: myIndex === -1 ? null : myIndex + 1,
    myTripCount: myIndex === -1 ? 0 : grouped[myIndex]._count.id,
  };
}

async function getLastWeekFinalResult(role, userId) {
  const currentWeekStart = getCurrentWeekStart();
  const lastWeekStart = new Date(currentWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const [top10, myEntry] = await Promise.all([
    prisma.weeklyLeaderboard.findMany({
      where: { weekStart: lastWeekStart, role },
      orderBy: { rank: 'asc' },
      take: 10,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    }),
    prisma.weeklyLeaderboard.findUnique({
      where: { userId_weekStart_role: { userId, weekStart: lastWeekStart, role } },
    }),
  ]);

  return {
    weekStart: lastWeekStart,
    top10,
    myRank: myEntry?.rank ?? null,
    myTripCount: myEntry?.tripCount ?? 0,
  };
}

export const getMyLeaderboardStatus = catchAsync(async (req, res) => {
  const { role, id: userId } = req.user;

  const [lastWeek, currentWeek] = await Promise.all([
    getLastWeekFinalResult(role, userId),
    getLiveCurrentWeekRanking(role, userId),
  ]);

  res.status(200).json({ success: true, data: { lastWeek, currentWeek } });
});