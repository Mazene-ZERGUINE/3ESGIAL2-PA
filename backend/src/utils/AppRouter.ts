import express, { Express, json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import userRouter from '../routes/client/user.router';
import signInRouter from '../routes/client/sign-in.router';
import { recoverPassword } from './security';
import utilisateurRouter from '../routes/clm/utilisateur.router';
import authRouter from '../routes/clm/auth.router';
import sessionRouter from '../routes/clm/session.router';
import categorieRouter from '../routes/clm/categorie.router';
import publicationRouter from '../routes/clm/publication.router';

export default class AppRouter {
	private readonly categoryRoutes: any = require('../routes/client/categories.routes');
	private readonly tasksRoutes: any = require('../routes/client/tasks.routes');
	private readonly ticketsRouts: any = require('../routes/client/tickers.routes');

	initRoutes = (app: Express) => {
		app
			.use(express.json({ type: '*/*' }))
			.use(cors())
			.use(json({ type: '*/*' }))
			.use(helmet());
		app.use('/api/client/categories', this.categoryRoutes);
		app.use('/api/client/users', userRouter);
		app.use('/api/client/tasks', this.tasksRoutes);
		app.use('/api/trello/signin', signInRouter);
		app.use('/api/client/tickets', this.ticketsRouts);
		app.post('/api/client/recover_password', recoverPassword);
		//#region			clm
		app
			.use('/api/clm/auth', authRouter)
			.use('/api/clm/categories', categorieRouter)
			.use('/api/clm/publications', publicationRouter)
			.use('/api/clm/sessions', sessionRouter)
			.use('/api/clm/utilisateurs', utilisateurRouter);
		//#endregion	clm
	};
}
