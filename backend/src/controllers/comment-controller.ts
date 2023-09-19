import asyncHandler from 'express-async-handler';
// collections
import Comment from '../models/comment';
import Chronicle from '../models/chronicle';
import User from '../models/user';
// validators
import { body, validationResult } from 'express-validator';
// -------------------------------------------------- //

export const get_all_comments_by_chronicle = asyncHandler(
  async (req, res, next) => {
    const chronicleId = req.params.chronicleId;

    try {
      const chronicle = await Chronicle.findById(chronicleId)
        .select('comments')
        .populate('comments');

      const comments = chronicle?.comments;

      res.status(200).json(comments);
    } catch (err) {
      return next(err);
    }
  }
);

export const comment_create = [
  body('content').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
        return;
      } else {
        if (req.body.chronicleId) {
          const newComment = new Comment({
            author: req.body.author,
            date: new Date(),
            content: req.body.content,
            likes: [],
          });

          await newComment.save();

          await Chronicle.findByIdAndUpdate(req.body.chronicleId, {
            $push: { comments: newComment },
          });

          res.status(200).json(newComment);
          return;
        } else if (req.body.commentId) {
          const newComment = new Comment({
            author: req.body.author,
            date: new Date(),
            content: req.body.content,
            likes: [],
          });

          await newComment.save();

          await Comment.findByIdAndUpdate(req.body.commentId, {
            $push: { replies: newComment },
          });

          res.status(200).json(newComment);
          return;
        } else res.status(400);
      }
    } catch (err) {
      return next(err);
    }
  }),
];

export const comment_like = asyncHandler(async (req, res, next) => {
  const commentId = req.params.commentId;
  const username = req.body.username;

  try {
    const comment = await Comment.findById(commentId).populate('likes').exec();
    const user = await User.findOne({ username: username }).exec();

    if (comment && user) {
      console.log(user);
      if (comment.likes.some((like) => like.username === user.username)) {
        await Comment.findByIdAndUpdate(commentId, {
          $pull: { likes: user._id },
        });
        res.sendStatus(200);
      } else {
        await Comment.findByIdAndUpdate(commentId, {
          $push: { likes: user },
        });
        res.sendStatus(200);
      }
    }
  } catch (err) {
    return next(err);
  }
});
