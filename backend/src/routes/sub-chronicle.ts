import express from 'express';
// controllers
import { sub_chronicle_create } from '../controllers/sub-chronicle-controller';
// -------------------------------------------------- //

const router = express.Router();

// create new sub-chronicle
router.post('/create', sub_chronicle_create);

export default router