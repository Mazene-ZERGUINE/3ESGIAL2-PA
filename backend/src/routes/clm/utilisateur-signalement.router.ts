import { Router } from 'express';

import { UtilisateurSignalementController } from '../../controllers/clm/UtilisateurSignalement.controller';
import { UtilisateurSignalement } from '../../models/clm/utilisateur-signalement';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get(
		'/',
		UtilisateurSignalementController.coreGetAllAndOrderedBy(UtilisateurSignalement, 'DESC', 'signalement_personne_id'),
	)
	.get('/:id', UtilisateurSignalementController.coreGetOneByPk(UtilisateurSignalement))
	.get('/getByStatus', UtilisateurSignalementController.getAllByStatus)
	.get('/count/all', UtilisateurSignalementController.coreCount(UtilisateurSignalement))

	.post('/', [isAuthenticated], UtilisateurSignalementController.create)
	.put('/:id', [isAuthenticated], UtilisateurSignalementController.SPupdateById);

export default router;
