import express from 'express';
// controllers
import { category_create } from '../controllers/category-controller';
// -------------------------------------------------- //

const router = express.Router();

router.post('/create', category_create);

export default router;
