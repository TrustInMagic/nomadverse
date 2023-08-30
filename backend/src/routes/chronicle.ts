import express from 'express';
// controllers
import { chronicle_create } from '../controllers/chronicleController';
// -------------------------------------------------- //

const router = express.Router();

// create new chronicle
router.post('/create', chronicle_create);

export default router;
