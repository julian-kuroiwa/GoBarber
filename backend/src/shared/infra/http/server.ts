import 'reflect-metadata';
import '@shared/container';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import 'express-async-errors';
import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import { errors } from 'celebrate';
import routes from './routes';

import RateLimiter from './middlewares/RateLimiter';

import '@shared/infra/typeorm';

const app = express();

app.use(RateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }
);

app.listen('3333', () => {
  console.log('🚀Server started on 3333!');
});
