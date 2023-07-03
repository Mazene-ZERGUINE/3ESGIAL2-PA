import { Router } from 'express';

import { UtilisateurController } from '../../controllers/clm/Utilisateur.controller';
import { Utilisateur } from '../../models/clm/utilisateur';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get(
		'/',
		[isAuthenticated, isAdministrator],
		UtilisateurController.coreGetAllWithoutInclude(Utilisateur, 'utilisateur'),
	)
	.get('/count/all', [isAuthenticated, isAdministrator], UtilisateurController.coreCount(Utilisateur))
	.get('/:pseudonyme', UtilisateurController.getByPseudonyme)
	.get('/:pseudonyme/publications', isAuthenticated, UtilisateurController.getAllPublications)
	.get('/:pseudonyme/publications/count', isAuthenticated, UtilisateurController.countAllPublications)
	.post('/', UtilisateurController.create)
	.put('/:pseudonyme', isAuthenticated, UtilisateurController.updateByPseudonyme)
	.patch('/:pseudonyme', isAuthenticated, UtilisateurController.updatePassword)
	.delete('/:id', isAuthenticated, UtilisateurController.coreDeleteById(Utilisateur));

export default router;
