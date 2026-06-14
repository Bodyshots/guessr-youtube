import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Game from '../../models/Game/Game.model';
import Video from '../../models/Video/Video.model';
import GameVideo from '../../models/GameVideo/GameVideo.model';

const router = express.Router();

const getGames = asyncHandler(async (req: Request, res: Response) => {
  const games = await Game.findAll();
  res.json({ message: 'Success', games });
});

const getVideos = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log("test")
    const gameId = req.params.gameId;
    const gameVideos = await GameVideo.findAll({ where: { gameId: gameId } });
    const videoIds = gameVideos.map(video => video.videoId);
    const videos = await Video.findAll({ where: { id: videoIds } });

    res.json({
      message: "Success",
      videos: videos
    })
  }
  catch (error) {
    console.error("Error getting videos");
    res.status(500).json({ message: "Error getting videos" })
  }
});

const startGame = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId, theme, gameMode } = req.body;

    const videos = await Video.findAll({
      where: {
        theme: theme,
        active: true,
        gameMode: gameMode
      }
    })

    if (!videos) {
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

    await GameVideo.addVideos(game, videos);

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
router.get('/videos/:gameId', getVideos);

router.post('/start', startGame);
router.post('/finish', finishGame);


export default router;