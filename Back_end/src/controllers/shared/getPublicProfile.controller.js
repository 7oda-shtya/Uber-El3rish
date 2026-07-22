import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';

export const getPublicProfile = catchAsync(async (req, res) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			avatar: true,
			role: true,
			avgRating: true,
			car: { select: { model: true, plateNumber: true, picture: true } },
		},
	});

	if (!user) throw new ApiError(404, 'اليوزر مش موجود');

	res.status(200).json({ success: true, data: user });
});