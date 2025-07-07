/* eslint-disable @typescript-eslint/no-unused-vars */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, Request, Response } from 'express';
import express from 'express';
import { Error } from 'mongoose';
import router from './app/routs';
import { config } from './app/config';
export const app: Application = express();

//parser
// https://godrive-tawny.vercel.app
app.use(cors({origin:"https://godrive-tawny.vercel.app",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});
// error handling

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (err: Error & { statusCode?: number }, req: Request, res: Response, next: Function) => {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
);
