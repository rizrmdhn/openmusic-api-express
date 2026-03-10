import express, { type Express } from 'express';
import cors from 'cors';
import { router } from './router';
import { errorMiddleware } from './middleware/error.middleware';

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/', router);
app.use(errorMiddleware);

export default app;
