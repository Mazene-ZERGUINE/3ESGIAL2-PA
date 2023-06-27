import { Router } from 'express';

import { CommentaireController } from '../../controllers/clm/Commentaire.controller';
import { Commentaire } from '../../models/clm/commentaire';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get('/', [isAuthenticated], CommentaireController.coreGetAll(Commentaire))
	.get('/:id', CommentaireController.coreGetOneByPk(Commentaire))
	.get('/:id_publication', CommentaireController.getByIdPublication(Commentaire))
	.post(
		'/:id_user/:id_publication',
		[isAuthenticated, isAdministrator],
		CommentaireController.coreCreateWithoutTimestamps(Commentaire),
	)
	.put('/:id', [isAuthenticated, isAdministrator], CommentaireController.coreUpdateByIdWithoutTimestamps(Commentaire))
	.delete('/:id', [isAuthenticated, isAdministrator], CommentaireController.coreDeleteById(Commentaire));

export default router;
