import asyncHandler from 'express-async-handler';
// collections
import Category from '../models/category';
import Chronicle from '../models/chronicle';
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
  body('name', 'Name must be specified.').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    console.log('CATEGORY CREATE')
    try {
      const errors = validationResult(req);

      if (!req.user) {
        res.sendStatus(401);
        return;
      }

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

export const get_chronicles_in_category = asyncHandler(
  async (req, res, next) => {
    const { category } = req.params;

    const foundCategory = await Category.findOne({ name: category });

    if (!foundCategory) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      try {
        const allChroniclesInCategory = await Chronicle.find({
          category: foundCategory._id,
        })
          .populate('category')
          .populate('author')
          .exec();

        if (allChroniclesInCategory.length === 0) {
          res
            .status(404)
            .json({ message: 'No chronicles found in this category' });
        } else {
          res.status(200).json(allChroniclesInCategory);
        }
      } catch (error) {
        next(error);
      }
    }
  }
);
