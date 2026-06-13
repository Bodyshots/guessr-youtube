import asyncHandler from 'express-async-handler';
import express, { Request, Response } from 'express';
import User from '../../models/User';
import Video from '../../models/Video';
import Game from '../../models/Game';
import { GAME_MODES } from '../../types';

const router = express.Router();

const initialize = asyncHandler(async (req: Request, res: Response) => {
  try {
    // Videos
    const video1 = await Video.create({
      title: 'Rick Astley - Never Gonna Give You Up(Official Video)(4K Remaster) ',
      description: 'The official video for “Never Gonna Give You Up” by Rick Astley.',
      thumbnail: 'www.google.com',
      channelTitle: 'Rick Astley',
      viewCount: 300,
      likeCount: 2,
      commentCount: 3,
      category: 4,
      theme: 'Music',
      publishedAt: new Date(),
      active: true,
      gameMode: GAME_MODES.VIEWERS
    });
    const video2 = await Video.create({
      title: 'Boom Boxx Feat Linda O. - Balla Da Li',
      description: ':)',
      thumbnail: 'www.youtube.com',
      channelTitle: 'Bdon',
      viewCount: 12267842,
      likeCount: 284000,
      commentCount: 37552,
      category: 4,
      theme: 'Music',
      publishedAt: new Date(),
      active: true,
      gameMode: GAME_MODES.LIKES
    });

    // Users
    const user1 = await User.create({
      username: 'Bob',
      email: 'test@test.com',
      password: '$2b$10$JX29LTDesd8L9BZok0WjGOyfi9.9M3Mlx491r5So3ixuI8r9xHTY2',
    });
    const user2 = await User.create({
      username: 'Alice',
      email: 'test1@test1.com',
      password: '$2b$10$JX29LTDesd8L9BZok0WjGOyfi9.9M3Mlx491r5So3ixuI8r9xHTY2',
    });
    const user3 = await User.create({
      username: 'Michael',
      email: 'test2@test2.com',
      password: '$2b$10$JX29LTDesd8L9BZok0WjGOyfi9.9M3Mlx491r5So3ixuI8r9xHTY2',
    });

    // Games
    const game1 = await Game.create({
      userId: user1.id,
      theme: "Music",
      gameMode: GAME_MODES.VIEWERS,
      gameStartTime: new Date(),
      statuses: [],
      guesses: []
    })

    const game2 = await Game.create({
      userId: user2.id,
      theme: "Music",
      gameMode: GAME_MODES.LIKES,
      gameStartTime: new Date(),
      statuses: [],
      guesses: [],
    })
    const game3 = await Game.create({
      userId: user2.id,
      theme: "Music",
      gameMode: GAME_MODES.VIEWERS,
      gameStartTime: new Date(),
      gameEndTime: new Date(),
      statuses: [],
      guesses: [],
    })

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