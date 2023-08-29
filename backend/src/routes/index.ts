import express from 'express';
// controllers
import {
  get_all_chronicles,
  chronicle_create,
} from '../controllers/chronicleController';
import { get_all_users, create_user } from '../controllers/userController';
// -------------------------------------------------- //

const router = express.Router();

// get all chronicles
router.get('/', get_all_chronicles);

// create new chronicle
router.post('/chronicle/create', chronicle_create);

// get all users
router.get('/users', get_all_users);

// create new user
router.post('/user/create', create_user);

export default router;
