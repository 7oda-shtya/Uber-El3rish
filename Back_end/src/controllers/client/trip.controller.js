import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';

export const RequestTrip = catchAsync(async (req, res) => {
	const clientId = req.user.id;
	const { startLocation, endLocation, ridersCount, customerNote, scheduledTime, pickupDistanceM, farFromPickupNote, waypoints, route } = req.body;

	const trip = await prisma.trip.create({
		data: {
			clientId,
			startLat: startLocation.lat,
			startLng: startLocation.lng,
			startName: startLocation.name,
			endLat: endLocation.lat,
			endLng: endLocation.lng,
			endName: endLocation.name,
			ridersCount,
			customerNote,
			scheduledTime,
			pickupDistanceM,
			farFromPickupNote,
			waypoints,
			route
		},
	});

	res.status(200).json({ success: true, data: trip });
})

export const cancelTrip = catchAsync(async (req, res) => {
	const { tripId } = req.params;
	const clientId = req.user.id;

	const trip = await prisma.trip.findUnique({
		where: { id: tripId },
	});
	if (!trip) throw new ApiError(404, 'الرحلة مش موجودة');
	if (trip.clientId !== clientId) {
		throw new ApiError(403, 'مش مسموحلك تلغي الرحلة ده');
	}
	if (trip.status === 'PENDING') {
		await prisma.trip.update({
			where: { id: tripId },
			data: { status: 'CANCELLED' },
		});
		res.status(200).json({ success: true, message: 'Trip canceled successfully' });
	} else {
		res.status(400).json({ success: false, message: 'Trip cannot be canceled' });
	}
})

export const getMyTrips = catchAsync(async (req, res) => {
	const clientId = req.user.id;
	const trips = await prisma.trip.findMany({
		where: { clientId },
		orderBy: { createdAt: 'desc' },
	});
	res.status(200).json({ success: true, data: trips });
})

export const getPendingTripOffers = catchAsync(async (req, res) => {
	const clientId = req.user.id;
	const { tripId } = req.params;

	const offers = await prisma.offer.findMany({
		where: { tripId, trip: { clientId }, status: 'PENDING' },
		orderBy: { createdAt: 'desc' },
	});
	res.status(200).json({ success: true, data: offers });
})

export const acceptOffer = catchAsync(async (req, res) => {
  const clientId = req.user.id;
  const { offerId } = req.params;

  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: { trip: true },
  });

  if (!offer) throw new ApiError(404, 'العرض مش موجود');
  if (offer.trip.clientId !== clientId) {
    throw new ApiError(403, 'مش مسموحلك تقبل العرض ده');
  }
  if (offer.trip.status !== 'PENDING') {
    throw new ApiError(400, 'الرحلة دي اتقفلت أو اتقبل فيها عرض قبل كده');
  }

  const updatedTrip = await prisma.$transaction(async (tx) => {
    await tx.offer.updateMany({
      where: { tripId: offer.tripId, id: { not: offerId } },
      data: { status: 'REJECTED' },
    });
    return tx.trip.update({
      where: { id: offer.tripId },
      data: { driverId: offer.driverId, price: offer.price, status: 'BOOKED' },
    });
  });

  res.status(200).json({ success: true, data: updatedTrip });
});

export const endTrip = catchAsync(async (req, res) => {
	const clientId = req.user.id;
	const { tripId } = req.params;

	const trip = await prisma.trip.findUnique({ where: { id: tripId } });
	if (!trip) throw new ApiError(404, 'الرحلة مش موجودة');
	if (trip.clientId !== clientId) throw new ApiError(403, 'مش مسموحلك تنهي الرحلة دي');
	if (trip.status === 'COMPLETED') {
		return res.status(200).json({ success: true, message: 'الرحلة انتهت بالفعل' });
	}

	await prisma.trip.update({ where: { id: tripId }, data: { status: 'COMPLETED' } });

	const completedTrips = await prisma.trip.count({ where: { clientId, status: 'COMPLETED' } });
	const client = await prisma.user.findUnique({ where: { id: clientId } });

	if (completedTrips === 1 && client.referredById) {
		await issueCoupon({ userId: client.referredById, type: 'REFERRAL', value: 10, validDays: 7 });
	}

	res.status(200).json({ success: true, message: 'الرحلة انتهت بنجاح' });
})