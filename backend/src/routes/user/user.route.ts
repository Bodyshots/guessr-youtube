import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../../models/User';

const router = express.Router();

// Insert all user-related routes below

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ message: 'Success', users });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByPk(Array.isArray(userId) ? userId[0] : userId);

  res.json({ message: 'Success', user });
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const userData = req.body;

  const newUser = await User.create(userData);

  res.json({ message: 'Success', user: newUser });
});

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

export default router;