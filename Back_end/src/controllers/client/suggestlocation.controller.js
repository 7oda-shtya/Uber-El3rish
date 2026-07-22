import { prisma } from '../../db.js';
import { catchAsync } from '../../utils/catchAsync.js';
import ApiError from '../../utils/ApiError.js';

export const suggestLocation = catchAsync(async (req, res) => {
  const suggestedById = req.user.id;
  const { lat, lng, name } = req.body;
  const newSuggestion = await prisma.areaSuggestion.create({
    data: { lat, lng, name, suggestedById },
  });
  res.status(201).json({ success: true, data: newSuggestion });
});