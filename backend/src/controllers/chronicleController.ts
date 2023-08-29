import asyncHandler from 'express-async-handler';
// collections
import Chronicle from '../models/chronicle';
// validators
import { body, validationResult } from 'express-validator';
// -------------------------------------------------- //

export const get_all_chronicles = asyncHandler(async (req, res, next) => {
  const allChronicles = Chronicle.find().exec();

  res.json(allChronicles);
});

export const chronicle_create = [
  body('title', 'Chronicle title must be specified.')
    .trim()
    .isLength({ max: 20, min: 1 })
    .escape(),
  body('')
];
