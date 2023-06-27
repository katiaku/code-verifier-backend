/**
 * Root Router
 * Redirections to Routers
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import goodbyeRouter from './GoodbyeRouter';
import { LogInfo } from '../utils/logger';
import userRouter from './UserRouter';
import kataRouter from './KataRouter';
import authRouter from './AuthRouter';

// Server instance
let server = express();

// Router instance
let rootRouter = express.Router();

// Activate for requests to http://localhost:8000/api

// GET: http://localhost:8000/api/
rootRouter.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http//localhost:8000/api/');
    res.send('Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');
});

// Redirections to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8000/api/
server.use('/hello', helloRouter); // http://localhost:8000/api/hello --> HelloRouter
server.use('/goodbye', goodbyeRouter);  // http://localhost:8000/api/goodbye --> GoodbyeRouter
server.use('/users', userRouter); // http://localhost:8000/api/users --> UserRouter
// Katas routes
server.use('/katas', kataRouter); // http://localhost:8000/api/katas --> KataRouter
// Auth routes
server.use('/auth', authRouter); // http://localhost:8000/api/auth --> AuthRouter

export default server;
