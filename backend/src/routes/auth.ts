import express from 'express';
// controllers
import {
  create_user,
  login_user,
  logout_user,
} from '../controllers/userController';
// -------------------------------------------------- //

const router = express.Router();

// create new user
router.post('/register', create_user);

// login user
router.post('/login', login_user);

// logout user
router.post('/logout', logout_user);

export default router;
