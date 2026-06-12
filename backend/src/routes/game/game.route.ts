import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Game from '../../models/Game';

const router = express.Router();

const getGames = asyncHandler(async (req: Request, res: Response) => {
  const games = await Game.findAll();
  res.json({ message: 'Success', games });
});

router.get('/', getGames);

export default router;