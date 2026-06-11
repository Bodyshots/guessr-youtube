import { NextFunction, Request, Response } from 'express';


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(`errorHandler - Name: ${err.name} - Message: ${err.message}\n Stack: ${err.stack}`);
    return res.status(500).send({ message: err.message }).end();
  }
  next();
};

export default errorHandler;
