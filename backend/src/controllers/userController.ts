//
import asyncHandler from 'express-async-handler';
import createHttpError from 'http-errors';
//collections
import User from '../models/user';
// validators
import { body, validationResult } from 'express-validator';
// -------------------------------------------------- //

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export const get_all_users = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find().exec();

  res.json(allUsers);
});

export const create_user = [
  body('email', 'Email is a required field.')
    .matches(EMAIL_REGEX)
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please provide a valid email address.')
    .escape(),

  body('email').custom(async (value) => {
    const user = await User.findOne({ email: value });

    if (user) {
      throw new Error('E-mail already in use.');
    }
  }),

  body('username', 'A username must be provided.')
    .trim()
    .isLength({ min: 1 })
    .matches(USERNAME_REGEX)
    .withMessage('Invalid characters in the username.')
    .escape(),

  body('password', 'Password must be provided.')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Password must be 5 characters or longer.')
    .escape(),

  body('password_confirm').custom((value, { req }) => {
    return value === req.body.password;
  }),

  body('first_name', 'First name must be provided.')
    .trim()
    .isLength({ min: 2 })
    .escape(),

  body('last_name', 'Last name must be provided.')
    .trim()
    .isLength({ min: 2 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.body.role || 'user',
    });

    if (!errors.isEmpty()) {
      const customError = createHttpError(400, 'Invalid Request', {
        headers: {
          Errors: errors.array(),
        },
      });
      res.send(customError);
      return;
    } else {
      await user.save();
      res.sendStatus(200);
    }
  }),
];
