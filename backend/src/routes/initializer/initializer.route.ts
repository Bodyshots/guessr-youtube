import asyncHandler from 'express-async-handler';
import express, { Request, Response } from 'express';
import User from '../../models/User';
import Video from '../../models/Video';
import GameHistory from '../../models/GameHistory/GameHistory.model';
import Game from '../../models/Game';

const router = express.Router();

const initialize = asyncHandler(async (req: Request, res: Response) => {
  try { // Videos
    await Video.create({
      title: 'Rick Astley - Never Gonna Give You Up(Official Video)(4K Remaster) ',
      description: 'The official video for “Never Gonna Give You Up” by Rick Astley.',
      thumbnail: 'www.google.com',
      channelTitle: 'Rick Astley',
      viewCount: 1,
      likeCount: 2,
      commentCount: 3,
      category: 4,
      theme: 'Music',
      publishedAt: new Date()
    });

    // User
    await User.create({
      username: 'Bob',
      email: 'test@test.com',
      password: 'abc123',
    });
    await User.create({
      username: 'Alice',
      email: 'test1@test1.com',
      password: 'testtest'
    });

  } catch (err) {
    console.log('initializer creating encountered error: ', JSON.stringify(err));
    res.status(500).json({ message: 'Error' });
    return;
  }

  res.json({ message: 'Success' });
});

const clear = asyncHandler(async (req: Request, res: Response) => {
  try {
    await Game.destroy({ where: {} });
    await GameHistory.destroy({ where: {} });
    await Video.destroy({ where: {} });
    await User.destroy({ where: {} });
  } catch (err) {
    console.log('initializer clearing encountered error: ', JSON.stringify(err));
    res.status(500).json({ message: 'Error' });
    return;
  }

  res.json({ message: 'Success' });
})

router.get('/', initialize);
router.delete('/', clear);

export default router;