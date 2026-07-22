import ApiError from "../utils/ApiError.js";

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "مش مسموحلك تدخل هنا"));
    }
    next();
  };
}