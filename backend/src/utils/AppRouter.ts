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
import { isAdministrator, isAuthenticated } from '../middlewares/clm/auth.middleware';
import imageRouter from '../routes/clm/image.router';
import publicationAppreciationRouter from '../routes/clm/publication-appreciation.router';
import {
	checkForExportFormats,
	checkThemes,
	checkUpdates,
	sendExportsFiles,
	sendThemeFileName,
	sendUpdatesFile,
} from '../controllers/client/UpdatesController';
import publicationFavoriRouter from '../routes/clm/publication-favori.router';
import reputationRouter from '../routes/clm/reputation.router';
import commentaireRouter from '../routes/clm/commentaire.router';

export default class AppRouter {
	private readonly categoryRoutes: any = require('../routes/client/categories.routes');
	private readonly tasksRoutes: any = require('../routes/client/tasks.routes');
	private readonly ticketsRouts: any = require('../routes/client/tickers.routes');

	initRoutes = (app: Express) => {
		app
			// .use(express.json({ type: '*/*' }))
			.use(cors())
			.use(json())
			.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
		app.use('/api/client/categories', this.categoryRoutes);
		app.use('/api/client/users', userRouter);
		app.use('/api/client/tasks', this.tasksRoutes);
		app.use('/api/trello/signin', signInRouter);
		app.use('/api/client/tickets', this.ticketsRouts);
		app.post('/api/client/recover_password', recoverPassword);
		app.get('/api/client/check_updates/:current_version', checkUpdates);
		app.get('/api/client/check_exports', checkForExportFormats);
		app.get('/updates/:version', sendUpdatesFile);
		app.get('/exports/:format', sendExportsFiles);
		app.get('/themes/:theme', sendThemeFileName);
		app.get('/api/client/check_themes', checkThemes);

		//#region			clm
		app
			.use('/uploads/publications/images', express.static('uploads/publications/images'))
			.use('/api/clm/auth', authRouter)
			.use('/api/clm/categories', categorieRouter)
			.use('/api/clm/images', imageRouter)
			.use('/api/clm/publications', publicationRouter)
			.use('/api/clm/appreciations/publications', publicationAppreciationRouter)
			.use('/api/clm/favoris/publications', publicationFavoriRouter)
			.use('/api/clm/reputations/', reputationRouter)
			.use('/api/clm/sessions', [isAuthenticated, isAdministrator], sessionRouter)
			.use('/api/clm/utilisateurs', utilisateurRouter)
			.use('/api/clm/commentaires', commentaireRouter);
		//#endregion	clm
	};
}
