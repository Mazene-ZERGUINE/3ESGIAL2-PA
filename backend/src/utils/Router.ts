import express, { Express } from 'express';

export default class Router {
	constructor() {}

	private readonly categoryRoutes: any = require('../routes/client/categories.routes');

	initRoutes = (app: Express) => {
		app.use(express.json());
		app.use('/api/categories', this.categoryRoutes);
	};
}
