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
        return;
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
        const newChronicle = await Chronicle.find({ title: req.body.title })
          .populate('_id')
          .exec();

        res.status(200).json(newChronicle);
        return;
      }
    } catch (err) {
      return next(err);
    }
  }),
];

export const chronicle_get = asyncHandler(async (req, res, next) => {
  const chronicleId = req.params.chronicleId;
  if (!chronicleId) {
    res.status(400).json('No chronicleId specified.');
  }
  try {
    const chronicle = await Chronicle.findById(chronicleId)
      .populate('author')
      .populate('category')
      .populate('sub_chronicles')
      .exec();
    res.json(chronicle);
  } catch (err) {
    return next(err);
  }
});

export const chronicle_search = asyncHandler(async (req, res, next) => {
  const search = req.query.search as string;
  const allChronicles = await Chronicle.find().populate('category');
  const searchedChronicles: any[] = [];

  allChronicles.forEach((chronicle) => {
    if (chronicle.title.toLocaleLowerCase().includes(search.toLowerCase())) {
      searchedChronicles.push(chronicle);
    }
  });

  res.status(200).json(searchedChronicles);
});
