import express from 'express';
import userController from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', (req, res) => {
  userController.registerUser(req, res);
});

router.post('/login', (req, res) => {
  userController.loginUser(req, res);
});

// Protected route
router.get('/get-user/:id', auth, (req, res) => {
  userController.getUserById(req, res);
});

// Protected route
router.put('/update/:id', auth, (req, res) => {
  userController.updateUserById(req, res);
});

export default router;
