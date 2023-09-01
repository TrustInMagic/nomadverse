import asyncHandler from 'express-async-handler';
// collections
import Category from '../models/category';
// validators
import { body, validationResult } from 'express-validator';
// typescript
import { ExtendedRequest } from '../../types/express';
// -------------------------------------------------- //

export const get_all_categories = asyncHandler(
  async (req: ExtendedRequest, res, next) => {
    const allCategories = await Category.find().exec();
    req.allCategories = allCategories;
    next();
  }
);

export const category_create = [
  body('name', 'Name must be specified.').trim().escape().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
      } else {
        const category = new Category({
          name: req.body.name,
        });

        await category.save();
        res.sendStatus(200);
      }
    } catch (err: any) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        res.status(400).json({
          error: 'Category with the given name already exists',
        });
      } else {
        return next(err);
      }
    }
  }),
];
