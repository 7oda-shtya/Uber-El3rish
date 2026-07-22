class ApiError extends Error {
	constructor(statusCode, message, field = null) {
		super(message);
		this.statusCode = statusCode;
		this.field = field; 
		Error.captureStackTrace(this, this.constructor);
	}
}

export default ApiError;