import express, { Express } from 'express';


export default class AppRouter {
	constructor() {}

	private readonly categoryRoutes: any = require('../routes/client/categories.routes');
	private readonly tasksRoutes: any = require('../routes/client/tasks.routes');
	private readonly userRoutes: any = require("../routes/client/user.router'")

	initRoutes = (app: Express) => {
		app.use(express.json({ type: '*/*' }));
		app.use('/api/client/categories', this.categoryRoutes);
		app.use('/api/client/users', this.userRoutes);
		app.use('/api/client/tasks', this.tasksRoutes);
	};
}
