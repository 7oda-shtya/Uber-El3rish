import bcrypt from 'bcryptjs';
import ApiError from '../../utils/ApiError.js';
import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { generateToken } from '../../utils/auth.helpers.js';

function generateReferralCode(name) {
	const prefix = name.replace(/\s+/g, '').slice(0, 4).toUpperCase();
	const random = Math.random().toString(36).slice(2, 6).toUpperCase();
	return `${prefix}-${random}`;
}

export const register = catchAsync(async (req, res) => {
	const { name, phone, email, password, username, referralCode } = req.body;

	if (!name || !phone || !password || !username) {
		throw new ApiError(400, 'كل الحقول المطلوبة لازم تتملى');
	}

	const existingPhone = await prisma.user.findFirst({ where: { phone } });
	if (existingPhone) {
		throw new ApiError(400, 'رقم الهاتف ده مسجل بالفعل', 'phone');
	}

	const existingUsername = await prisma.user.findFirst({ where: { username } });
	if (existingUsername) {
		throw new ApiError(400, 'اسم المستخدم ده مستخدم بالفعل', 'username');
	}

	if (email) {
		const existingEmail = await prisma.user.findFirst({ where: { email } });
		if (existingEmail) {
			throw new ApiError(400, 'البريد الإلكتروني ده مستخدم بالفعل', 'email');
		}
	}

	let referredById = null;
	if (referralCode) {
		const referrer = await prisma.user.findFirst({
			where: { referralCode }
		})
		if (referrer) {
			referredById = referrer.id;
		}
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	
	await prisma.$transaction(async (tx) => {
		const newUser = await tx.user.create({
			data: {
				name,
				phone,
				email,
				password: hashedPassword,
				username,
				role: 'CLIENT',
				referralCode: generateReferralCode(name),
				referredById,
				accountStatus: 'ACTIVE'
			}
		});
		const token = generateToken(newUser);
	})
	res.status(201).json({
		success: true,
		data: {
			token,
			user: {
				id: newUser.id,
				name: newUser.name,
				role: newUser.role,
				referralCode: newUser.referralCode
			}
		}
	});
});

export const login = catchAsync(async (req, res) => {
	const { phone, password } = req.body;

	if (!phone || !password) {
		throw new ApiError(400, 'الرقم وكلمة السر مطلوبين');
	}
	const user = await prisma.user.findUnique({ where: { phone } });
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
				referralCode: user.referralCode

			}
		}
	})
})

export const me = catchAsync(async (req, res) => {
	res.status(200).json({
		success: true,
		data: { user: req.user }
	});
});