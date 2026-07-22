import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';

const driverId = (req) => req.user.id;

export const makeOffer = catchAsync(async (req, res) => {
	const { tripId } = req.params;
	const { price, timeToReach, startTime, note } = req.body;

	const trip = await prisma.trip.findUnique({ where: { id: tripId } });
	if (!trip) throw new ApiError(404, 'الرحلة مش موجودة');
	if (trip.status !== 'PENDING') {
		throw new ApiError(400, 'الرحلة دي مش متاحة للعروض');
	}

	const activeTrips = await prisma.trip.findMany({
		where: { driverId: driverId(req), status: { in: ['STARTED', 'BOOKED'] } },
	});

	if (activeTrips.length > 0) {
		const car = await prisma.car.findUnique({ where: { driverId: driverId(req) } });
		const usedSeats = activeTrips.reduce((sum, t) => sum + t.ridersCount, 0);

		if (usedSeats + trip.ridersCount > car.seats) {
			throw new ApiError(400, 'مفيش أماكن كافية في العربية');
		}
	}

	const offer = await prisma.offer.create({
		data: { driverId: driverId(req), tripId, price, timeToReach, startTime, note },
	});

	if(activeTrips) res.status(200).json({ success: true, data: {offer, trips: activeTrips} });
	else res.status(201).json({ success: true, data: offer });
});


export const getTrips = catchAsync(async (req, res) => {
	const car = await prisma.car.findUnique({ where: { driverId: driverId(req) } });
	const { seats } = car;

	const currentTrip = await prisma.trip.findFirst({
		where: {
			driverId: driverId(req),
			status: { in: ['STARTED', 'BOOKED'] }
		}
	});
	let availableSeats = seats;
	if (currentTrip) {
		const { ridersCount, route, scheduledTime } = currentTrip;
		availableSeats = seats - ridersCount;
	} else { availableSeats = seats; }
	if (availableSeats <= 0) {
		return res.status(200).json({ success: true, data: [] });
	}

	const trips = await prisma.trip.findMany({
		where: {
			status: 'PENDING',
			ridersCount: { lte: availableSeats },
			offers: { none: { driverId: driverId(req) } }
		},
		orderBy: { scheduledTime: 'asc' },
	});
	res.status(200).json({ success: true, data: trips });
})


export const cancelOffer = catchAsync(async (req, res) => {
	const { offerId } = req.params;

	const offer = await prisma.offer.findUnique({
		where: { id: offerId },
		include: { trip: true },
	});
	if (!offer) throw new ApiError(404, 'العرض مش موجود');
	if (offer.driverId !== driverId(req)) {
		throw new ApiError(403, 'مش مسموحلك تلفي العرض ده');
	}
	if (offer.trip.status !== 'PENDING') {
		throw new ApiError(400, 'الرحلة دي اتقفلت أو اتقبل فيها عرض قبل كده');
	}
	if (offer.status !== 'PENDING') {
		throw new ApiError(400, 'العرض ده اتقبل أو اتلغى قبل كده، مينفعش تلغيه');
	}

	await prisma.offer.update({
		where: { id: offerId },
		data: { status: 'CANCELLED' }
	});
	res.status(200).json({ success: true });
})