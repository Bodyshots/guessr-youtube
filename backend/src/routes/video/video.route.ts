import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Video from '../../models/Video';

const router = express.Router();

// Insert all video-related routes below

const getVideos = asyncHandler(async (req: Request, res: Response) => {
  const videos = await Video.findAll();
  res.json({ message: 'Success', videos });
});

router.get('/', getVideos);

export default router;