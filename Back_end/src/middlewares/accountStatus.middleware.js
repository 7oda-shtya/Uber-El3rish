import ApiError from '../utils/ApiError.js';

export function requireAccountStatus(req, res, next) {
	if (req.user.accountStatus !== 'ACTIVE') {
		const message = {
			'PENDING': 'الحساب ده لسه متفعلش',
			'SUSPENDED': 'الحساب ده متوقف',
			'BANNED': 'الحساب ده متحظر'
		}
		throw new ApiError(403, message[req.user.accountStatus] || 'الحساب ده مش متفعل');
	}
	next();
}