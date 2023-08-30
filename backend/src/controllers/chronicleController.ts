import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
// collections
import Chronicle from '../models/chronicle';
import User from '../models/user';
// validators
import { body, validationResult } from 'express-validator';
// -------------------------------------------------- //

export const get_all_chronicles = asyncHandler(async (req, res, next) => {
  const allChronicles = await Chronicle.find().exec();

  res.json(allChronicles);
});

export const chronicle_create = [
  body('title', 'Chronicle title must be specified.')
    .trim()
    .isLength({ max: 20, min: 1 })
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
        const customError = createHttpError(400, 'Invalid Request', {
          headers: {
            Errors: errors.array(),
          },
        });
        res.send(customError);
        return;
      } else {
        console.log('USER IS', req.user.username);
        const author = await User.findOne({ username: req.user.username });

        const chronicle = new Chronicle({
          title: req.body.title,
          date: new Date(),
          image_url: req.body.image_url,
          author: author,
          description: req.body.description,
          category: req.body.category,
        });

        await chronicle.save();
        res.sendStatus(200);
      }
    } catch (err) {
      return next(err);
    }
  }),
];
