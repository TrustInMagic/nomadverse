import asyncHandler from 'express-async-handler';
// collections
import Chronicle from '../models/chronicle';
import User from '../models/user';
import Category from '../models/category';
// validators
import { body, validationResult } from 'express-validator';
// types
import { ExtendedRequest } from '../../types/express';
// -------------------------------------------------- //

export const get_all_chronicles = asyncHandler(
  async (req: ExtendedRequest, res, next) => {
    const allChronicles = await Chronicle.find()
      .populate('category', 'name')
      .populate('author', 'username')
      .populate('sub_chronicles')
      .exec();
    req.allChronicles = allChronicles;
    next();
  }
);

export const chronicle_create = [
  body('title', 'Chronicle title must be specified.')
    .trim()
    .isLength({ max: 50, min: 1 })
    .escape(),

  body('image_url', 'Image URL must be specified.').trim().escape(),

  body('description', 'Description must be specified')
    .trim()
    .isLength({ min: 10 })
    .escape(),

  body('category', 'Category must be specified.').trim().escape(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!req.user) {
        res.sendStatus(401);
      }

      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
      } else {
        const author = await User.findOne({ username: req.user.username });
        const category = await Category.findOne({ name: req.body.category });

        const chronicle = new Chronicle({
          title: req.body.title,
          date: new Date(),
          image_url: req.body.image_url,
          author: author,
          description: req.body.description,
          category: category,
        });

        await chronicle.save();
        res.sendStatus(200);
      }
    } catch (err) {
      return next(err);
    }
  }),
];

export const chronicle_get = asyncHandler(async (req, res, next) => {
  const chronicleId = req.body.chronicleId;
  try {
    const chronicle = await Chronicle.findById(chronicleId);
    res.json(chronicle);
  } catch (err) {
    return next(err);
  }
});
