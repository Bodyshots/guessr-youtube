import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import GameHistory from '../../models/GameHistory';

const router = express.Router();

const getGameHistories = asyncHandler(async (req: Request, res: Response) => {
  const gameHistories = await GameHistory.findAll();
  res.json({ message: 'Success', gameHistories });
});

router.get('/', getGameHistories);

export default router;