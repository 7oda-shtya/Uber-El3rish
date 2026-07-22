import ApiError from "../../utils/ApiError.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { prisma } from "../../db.js";

export const getSavedTrips = catchAsync(async (req, res) => {
	const savedTrips = await prisma.savedTrip.findMany({
		where: { userId: req.user.id },
		orderBy: { createdAt: 'desc' },
	});
	res.status(200).json({ success: true, data: savedTrips });
});

export const addLocationToSavedTrips = catchAsync(async (req, res) => {
	const { fromLat, fromLng, fromName, toLat, toLng, toName } = req.body;
	const userId = req.user.id;

	const savedTrip = await prisma.savedTrip.create({
		data: { fromLat, fromLng, fromName, toLat, toLng, toName, userId },
	});

	res.status(200).json({ success: true, data: savedTrip });
});

export const deleteSavedTrip = catchAsync(async (req, res) => {
	const { id } = req.params;
	const savedTrip = await prisma.savedTrip.findUnique({ where: { id } });
	if (!savedTrip || savedTrip.userId !== req.user.id) {
		throw new ApiError(404, 'المكان ده مش موجود');
	}
	await prisma.savedTrip.delete({ where: { id } });
	res.status(200).json({ success: true });
});