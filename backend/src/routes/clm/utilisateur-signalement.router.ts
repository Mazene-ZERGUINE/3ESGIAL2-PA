import { Router } from 'express';

import { UtilisateurSignalementController } from '../../controllers/clm/UtilisateurSignalement.controller';
import { UtilisateurSignalement } from '../../models/clm/utilisateur-signalement';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get(
		'/',
		[isAuthenticated, isAdministrator],
		UtilisateurSignalementController.coreGetAndCountAllWithTimestamps(UtilisateurSignalement),
	)
	.get(
		'/:id',
		[isAuthenticated, isAdministrator],
		UtilisateurSignalementController.coreGetOneByPk(UtilisateurSignalement),
	)
	.get('/signales/:signale_id/signaleurs/:signaleur_id', UtilisateurSignalementController.isReportedBySignaleurId)
	.get('/getByStatus', UtilisateurSignalementController.getAllByStatus)
	.get('/count/all', UtilisateurSignalementController.coreCount(UtilisateurSignalement))

	.post('/', [isAuthenticated], UtilisateurSignalementController.create)
	.put('/:id', [isAuthenticated, isAdministrator], UtilisateurSignalementController.SPupdateById)
	.delete(
		'/:id',
		[isAuthenticated, isAdministrator],
		UtilisateurSignalementController.coreDeleteById(UtilisateurSignalement),
	);

export default router;
