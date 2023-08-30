import asyncHandler from 'express-async-handler';
//collections
import User from '../models/user';
// validators
import { body, validationResult } from 'express-validator';
// bcrypt
import bcrypt from 'bcryptjs';
// passport
import passport from 'passport';
// typescript
import { Request, Response } from 'express';
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
    try {
      const errors = validationResult(req);

      bcrypt.hash(
        req.body.password,
        10,
        async (err: Error, hashedPassword: string) => {
          if (err) {
            next(err);
          } else {
            if (!errors.isEmpty()) {
              res.status(400).json(errors.array());
              return;
            } else {
              const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedPassword,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                role: req.body.role || 'user',
              });

              await user.save();
              res.sendStatus(200);
            }
          }
        }
      );
    } catch (err) {
      return next(err);
    }
  }),
];

export const login_user = [
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    const { username } = req.user;
    res.json({ username: username });
  },
];

export const logout_user = asyncHandler(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
