import express from 'express';
// controllers
import {
  chronicle_create,
  chronicle_get,
  chronicle_search,
} from '../controllers/chronicle-controller';
// -------------------------------------------------- //

const router = express.Router();

// create new chronicle
router.post('/create', chronicle_create);

// search chronicle
// expects query params in the form ?search=value
router.get('/search', chronicle_search);

// get specific chronicle
router.get('/:chronicleId', chronicle_get);

export default router;
