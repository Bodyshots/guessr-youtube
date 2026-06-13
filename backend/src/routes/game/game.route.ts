import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Game from '../../models/Game';
import Video from '../../models/Video';

const router = express.Router();

const getGames = asyncHandler(async (req: Request, res: Response) => {
  const games = await Game.findAll();
  res.json({ message: 'Success', games });
});

const startGame = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, theme, gameMode } = req.body;

    const videoIds = await Video.findAll({
      where: {
        theme: theme,
        active: true,
        gameMode: gameMode
      }
    })

    if (!videoIds) {
      res.status(404).json({ message: "No videos available" });
      return;
    }

    const game = await Game.create({
      userId: userId,
      theme: theme,
      gameMode: gameMode,
      gameStartTime: new Date(),
      guesses: [],
      statuses: [],
    })

    res.json({
      message: "Success",
      game
    })
  }
  catch (error) {
    console.error("Error creating game", error);
    res.status(500).json({ message: "Error creating game" });
  }
});

// All gameProgress will be sent at once at the end of the game
const finishGame = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { gameId, guesses, statuses } = req.body;
    const game = await Game.findOne({ where: { id: gameId } });

    if (!game) {
      res.status(401).json({ message: "Game not found" })
      return;
    }

    game.gameEndTime = new Date();
    game.guesses = guesses;
    game.statuses = statuses;
    game.save();

    res.json({ message: "Success", game })
  }
  catch (error) {
    console.error("Error finishing game", error);
    res.status(500).json({ message: "Error finishing game" });
  }
});

// TODO: Auth for game owners
router.get('/', getGames);
router.post('/start', startGame);
router.post('/finish', finishGame);


export default router;