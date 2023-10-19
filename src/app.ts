import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import ApiError from './errors/ApiError';
const app: Application = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Application Routs
app.use('/api/v1', routes);

// Main route
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});

// Error Route
app.get('*', (req: Request, res: Response, next: NextFunction) => {
  const message = 'Not Found';
  const errorObjs = [
    {
      path: `${req.originalUrl}`,
      message: `Invalid URL! API not found`,
    },
  ];
  next(new ApiError(message, httpStatus.NOT_FOUND, errorObjs));
});

// global error handaler
app.use(globalErrorHandler);

export default app;
