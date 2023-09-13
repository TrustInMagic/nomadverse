import express from 'express';
// controllers
import {
  category_create,
  get_chronicles_in_category,
} from '../controllers/category-controller';
// -------------------------------------------------- //

const router = express.Router();

router.post('/create', category_create);

router.get('/:category', get_chronicles_in_category);

export default router;
