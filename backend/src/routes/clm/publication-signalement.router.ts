import { Router } from 'express';

import { PublicationSignalementController } from '../../controllers/clm/PublicationSignalement.controller';
import { PublicationSignalement } from '../../models/clm/publication_signalement';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get(
		'/',
		[isAuthenticated, isAdministrator],
		PublicationSignalementController.coreGetAndCountAllWithTimestamps(PublicationSignalement),
	)
	.get(
		'/:id',
		[isAuthenticated, isAdministrator],
		PublicationSignalementController.coreGetOneByPk(PublicationSignalement),
	)
	.get(
		'/publications/:publication_id/utilisateurs/:utilisateur_id',
		PublicationSignalementController.isReportedByUtilisateurId,
	)
	.post('/', PublicationSignalementController.create)
	.put('/:id', PublicationSignalementController.coreUpdateByIdWithTimestamps(PublicationSignalement))
	.delete(
		'/:id',
		[isAuthenticated, isAdministrator],
		PublicationSignalementController.coreDeleteById(PublicationSignalement),
	);

export default router;
