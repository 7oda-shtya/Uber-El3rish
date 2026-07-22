import { prisma } from '../db.js';

export function generateCouponCode() {
  return 'VERNA-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function issueCoupon({ userId, type, value, validDays }) {
  return prisma.coupon.create({
    data: {
      code: generateCouponCode(),
      userId,
      type,
      value,
      validUntil: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000),
    },
  });
}
