import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Router from './utils/AppRouter';

dotenv.config();
const app: Express = express();
const port: number = 3000;

const appRouter: Router = new Router();
appRouter.initRoutes(app);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
