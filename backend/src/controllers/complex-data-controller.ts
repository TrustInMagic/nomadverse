import asyncHandler from 'express-async-handler';
// typescript
import { ExtendedRequest } from '../../types/express';
// -------------------------------------------------- //

export const send_all_data = asyncHandler(async (req: ExtendedRequest, res) => {
  res.json({
    chronicles: req.allChronicles,
    categories: req.allCategories,
  });
});
