import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Logger from './utils/Logger';
import appRouter from './routes/v1';
import { NotFoundError } from './utils/ApiError';
import * as bodyParser from 'body-parser';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swaggers';

process.on('uncaughtException', e => {
  Logger.error(e);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({}));

// Routes
app.use('/api/v1', appRouter);
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('Welcome');
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use(errorHandler);

export default app;
