import express from 'express';
// controllers
import { get_all_chronicles } from '../controllers/chronicle-controller';
import { get_all_users } from '../controllers/user-controller';
import { get_all_categories } from '../controllers/category-controller';
import { send_all_data } from '../controllers/complex-data-controller';
// -------------------------------------------------- //

const router = express.Router();

// get all chronicles
router.get('/', get_all_chronicles, get_all_categories, send_all_data);

// get all users
router.get('/users', get_all_users);

export default router;
