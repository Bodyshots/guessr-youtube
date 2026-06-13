import express from 'express';
const router = express.Router();

import statusRouter from './status/index';
import userRouter from './user/index';
import gameRouter from './game/index';
import videoRouter from './video/index';
import initializerRouter from './initializer/index';

router.use('/status', statusRouter);

router.use('/initialize', initializerRouter);
router.use('/users', userRouter);
router.use('/games', gameRouter);
router.use('/videos', videoRouter);

export default router;