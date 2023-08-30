import express from 'express';
// controllers
import { get_all_chronicles } from '../controllers/chronicleController';
import { get_all_users } from '../controllers/userController';
import { get_all_categories } from '../controllers/categoryController';
// -------------------------------------------------- //

const router = express.Router();

// get all chronicles
router.get('/', get_all_chronicles, get_all_categories);

// get all users
router.get('/users', get_all_users);

export default router;
