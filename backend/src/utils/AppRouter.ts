import express, { Express } from 'express';

import userRouter from '../routes/client/user.router';

export default class AppRouter {
	constructor() {}

	private readonly categoryRoutes: any = require('../routes/client/categories.routes');

	initRoutes = (app: Express) => {
		app.use(express.json({ type: '*/*' }));
		app.use('/api/categories', this.categoryRoutes);
		app.use('/api/trello/users', userRouter);
	};
}
