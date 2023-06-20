import { Router } from 'express';

import { UtilisateurController } from '../../controllers/clm/Utilisateur.controller';
import { Utilisateur } from '../../models/clm/utilisateur';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get('/', [isAuthenticated, isAdministrator], UtilisateurController.coreGetAll(Utilisateur))
	.get('/:pseudonyme', UtilisateurController.getByPseudonyme)
	.post('/', UtilisateurController.create)
	.put('/:pseudonyme', isAuthenticated, UtilisateurController.updateByPseudonyme)
	.delete('/:id', isAuthenticated, UtilisateurController.coreDeleteById(Utilisateur));

export default router;
