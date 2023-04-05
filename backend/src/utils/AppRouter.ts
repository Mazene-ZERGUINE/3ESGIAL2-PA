import express, { Express } from 'express';

import userRouter from '../routes/client/user.router';
import signInRouter from '../routes/client/sign-in.router';

export default class AppRouter {
	constructor() {}

	private readonly categoryRoutes: any = require('../routes/client/categories.routes');
	private readonly tasksRoutes: any = require('../routes/client/tasks.routes');

	initRoutes = (app: Express) => {
		app.use(express.json({ type: '*/*' }));
		app.use('/api/client/categories', this.categoryRoutes);
		app.use('/api/client/users', userRouter);
		app.use('/api/client/tasks', this.tasksRoutes);
		app.use('/api/trello/signin', signInRouter);
	};
}
