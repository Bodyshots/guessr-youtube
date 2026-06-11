import express, { Request, Response } from 'express';

import CVSequelize from '../../models/init';

const router = express.Router();

const testDb = async () => {
  try {
    await CVSequelize.authenticate();
    return true;
  } catch (e) {
    return false;
  }
};

const getStatus = async (req: Request, res: Response) => {
  const isDbConnected = await testDb();

  if (isDbConnected) {
    return res.send({
      'DB connected': isDbConnected,
      'App version': process.env.npm_package_version,
      Uptime: process.uptime()
    }).end();
  }

  return res.status(412).send({
    'DB connected': isDbConnected,
    'App version': process.env.npm_package_version,
    Uptime: process.uptime()
  });
};

router.get('/', getStatus);

export default router;