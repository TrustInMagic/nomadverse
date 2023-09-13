import express from 'express';
// controllers
import {
  chronicle_create,
  chronicle_get,
} from '../controllers/chronicle-controller';
// -------------------------------------------------- //

const router = express.Router();

// create new chronicle
router.post('/create', chronicle_create);

// get specific chronicle
router.get('/:chronicleId', chronicle_get);

export default router;
