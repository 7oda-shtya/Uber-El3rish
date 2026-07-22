import { prisma } from '../db.js';
import { catchAsync } from '../utils/catchAsync.js';
import ApiError from '../utils/ApiError.js';

export const checkPendingFine = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const pendingFine = await prisma.penalty.findFirst({
    where: { userId, status: 'PENDING' },
  });

  if (pendingFine) {
    throw new ApiError(403, 'لازم تدفع الغرامة الأول قبل ما تقدر تطلب رحلة جديدة');
  }

  next();
});