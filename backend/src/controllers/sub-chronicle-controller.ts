import asyncHandler from 'express-async-handler';
// collections
import Chronicle from '../models/chronicle';
import SubChronicle from '../models/subchronicle';
// validators
import { body, validationResult } from 'express-validator';
// -------------------------------------------------- //

export const sub_chronicle_create = [
  body('description', 'Description must be specified')
    .trim()
    .isLength({ min: 10 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
      } else {
        const chronicleToAddTo = await Chronicle.findById(
          req.body.chronicle_id
        ).exec();

        const subChronicle = new SubChronicle({
          image_url: req.body.image_url,
          chronicle: chronicleToAddTo,
          description: req.body.description,
        });

        await subChronicle.save();

        const newSubChronicle = await SubChronicle.find({
          description: req.body.description,
        }).exec();

        await Chronicle.findOneAndUpdate(
          { _id: req.body.chronicle_id },
          { $push: { sub_chronicles: newSubChronicle } }
        ).exec();

        res.status(200).json(newSubChronicle);
        return;
      }
    } catch (err) {
      return next(err);
    }
  }),
];
