import express from "express";
import cors from "cors";
import env from "dotenv";
import bodyParser from 'body-parser'

import { SequelizeInit } from "./models/init"
import routes from './routes/index'
import cookieParser from "cookie-parser";

env.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:8080';

const initializeSequelize = async () => {
  console.log('Initializing sequelize');
  await SequelizeInit.run();
  console.log('Initializing sequelize completed');
};

const expressAppStart = () => {
  app.use(cors({
    origin: CORS_ORIGIN.split(','),
    credentials: true
  }));

  // See https://www.npmjs.com/package/body-parser
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  app.use(cookieParser());

  // Load routes
  app.use(routes);

  app.listen(PORT, () => {
    console.log(`Start: Backend listening on PORT ${PORT}`);
  });

  console.log('Express app start completed');
}

(async () => {
  await initializeSequelize();
  expressAppStart();
})();