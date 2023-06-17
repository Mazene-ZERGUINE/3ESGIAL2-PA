import { Router } from 'express';

import { UtilisateurController } from '../../controllers/clm/Utilisateur.controller';
import { Utilisateur } from '../../models/clm/utilisateur';

const router = Router();
router
	.get('/', UtilisateurController.coreGetAll(Utilisateur))
	.get('/:pseudonyme', UtilisateurController.getByPseudonyme)
	.post('/', UtilisateurController.create)
	.put('/:pseudonyme', UtilisateurController.updateByPseudonyme)
	.delete('/:id', UtilisateurController.coreDeleteById(Utilisateur));

export default router;
