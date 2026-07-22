import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';

export const getPendingDrivers = catchAsync(async (req, res) => {
	const drivers = await prisma.user.findMany({
		where: { role: 'DRIVER', accountStatus: 'PENDING' },
		include: { car: true },
		orderBy: { createdAt: 'asc' },
	});
	res.status(200).json({ success: true, data: drivers });
});

export const reviewDriver = catchAsync(async (req, res) => {
	const { id } = req.params;
	const { decision } = req.body;

	const driver = await prisma.user.findUnique({ where: { id } });
	if (!driver || driver.role !== 'DRIVER') {
		throw new ApiError(404, 'السواق مش موجود');
	}
	if (driver.accountStatus !== 'PENDING') {
		throw new ApiError(400, 'الحساب ده اتراجع قبل كده');
	}

	const updated = await prisma.user.update({
		where: { id },
		data: { accountStatus: decision },
	});

	res.status(200).json({ success: true, data: updated });
});