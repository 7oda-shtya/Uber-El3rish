import bcrypt from 'bcryptjs';
import ApiError from '../../utils/ApiError.js';
import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { generateToken } from '../../utils/auth.helpers.js';


export const register = catchAsync(async (req, res) => {
	const { name, phone, email, password, username, model, plateNumber } = req.body;

	if (!name || !phone || !password || !username || !model || !plateNumber) {
		throw new ApiError(400, 'كل الحقول المطلوبة لازم تتملى');
	}

	const existingUser = await prisma.user.findFirst({
		where: { OR: [{ phone }, ...[email ? [{ email }] : []], { username }] }
	});
	if (existingUser) {
		throw new ApiError(400, 'الرقم أو الإيميل أو اسم المستخدم ده مستخدم قبل كده');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.$transaction(async (tx) => {
		const user = await tx.user.create({
			data: {
				name,
				phone,
				email,
				password: hashedPassword,
				username,
				role: 'DRIVER',
				accountStatus: 'PENDING'
			}
		});
		await tx.car.create({
			data: {
				plateNumber,
				model,
				driverId: user.id
			}
		});
		return await tx.user.findUnique({
			where: { id: user.id },
			include: {
				car: true
			}
		});;
	});
	const token = generateToken(newUser);

	res.status(201).json({
		success: true,
		data: {
			token,
			user: {
				id: newUser.id,
				name: newUser.name,
				role: newUser.role,
				accountStatus: newUser.accountStatus,
				included: {
					car: {
						plateNumber: newUser.car.plateNumber,
						model: newUser.car.model
					}
				}
			}

		}
	});
});


export const login = catchAsync(async (req, res) => {
	const { phone, password } = req.body;

	if (!phone || !password) {
		throw new ApiError(400, 'الرقم وكلمة السر مطلوبين');
	}
	const user = await prisma.user.findUnique({ where: { phone }, include: { car: true } });
	if (!user) {
		throw new ApiError(401, 'الرقم أو كلمة السر غلط');
	}
	const isMatched = await bcrypt.compare(password, user.password);
	if (!isMatched) {
		throw new ApiError(401, 'الرقم أو كلمة السر غلط');
	}

	const token = generateToken(user);
	res.status(200).json({
		success: true,
		data: {
			token,
			user: {
				id: user.id,
				name: user.name,
				role: user.role,
				accountStatus: user.accountStatus,
				included: {
					car: {
						plateNumber: user.car.plateNumber,
						model: user.car.model
					}
				}
			}
		}
	})
})