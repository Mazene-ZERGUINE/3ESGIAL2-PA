import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import Router from './utils/AppRouter';
import { sequelize } from './db/clm/db_connection';

sequelize
	.sync({ force: false })
	.then(() => console.log('Connected to "clm" db.'))
	.catch((err) => console.error('Unable to connect to the database:', err));

const app: Express = express();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const appRouter: Router = new Router();
appRouter.initRoutes(app);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`);
});
