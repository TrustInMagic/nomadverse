import express from 'express';
// controllers
import {
  comment_create,
  get_all_comments_by_chronicle,
  comment_like,
} from '../controllers/comment-controller';
// -------------------------------------------------- //

const router = express.Router();

// create new comment
router.post('/create', comment_create);

// get chronicle comments
router.get('/:chronicleId', get_all_comments_by_chronicle);

// like comment

router.post('/like/:commentId', comment_like);

export default router;
