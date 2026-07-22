import { catchAsync } from "../../utils/catchAsync.js";
import { prisma } from "../../db.js";
import ApiError from "../../utils/ApiError.js";

export const getPenalty = catchAsync(async (req, res) => {
	const { id } = req.params;
	const penalty = await prisma.penalty.findFirst({ where: { id, status: 'PENDING' } });
	res.status(200).json({ success: true, data: penalty });
});

export const payPenalty = catchAsync(async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	const penalty = await prisma.penalty.findFirst({
		where: { id, status: 'PENDING' },
		include: { report: true },
	});
	if (!penalty) throw new ApiError(404, 'الغرامة مش موجودة أو اتدفعت قبل كده');

	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (user.wallet < penalty.amount) {
		throw new ApiError(400, 'رصيد المحفظة مش كافي');
	}
	const reporterId = penalty.report?.reporterId;

	await prisma.$transaction([
		prisma.user.update({
			where: { id: userId },
			data: { wallet: { decrement: penalty.amount } },
		}),
		prisma.user.update({
			where: { id: reporterId },
			data: { wallet: { increment: penalty.amount } },
		}),
		prisma.penalty.update({
			where: { id },
			data: { status: 'PAID', paidAt: new Date() },
		}),
	]);

	res.status(200).json({ success: true, message: 'تم دفع الغرامة بنجاح' });
});