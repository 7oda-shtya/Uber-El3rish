import jwt from "jsonwebtoken";
import { prisma } from './../db.js';
import { catchAsync } from "../utils/catchAsync.js";
import ApiError from "../utils/ApiError.js";

export const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "مفيش توكن، سجل دخول الأول");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: { id: true, role: true, name: true, accountStatus: true },
  });

  if (!user) throw new ApiError(401, "اليوزر مش موجود");

  req.user = user;
  next();
})