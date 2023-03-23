import express, { Express } from 'express';

export default class AppRouter {
	constructor() {}

	private readonly categoryRoutes: any = require('../routes/client/categories.routes');

	initRoutes = (app: Express) => {
		app.use(express.json({ type: '*/*' }));
		app.use('/api/categories', this.categoryRoutes);
	};
}
