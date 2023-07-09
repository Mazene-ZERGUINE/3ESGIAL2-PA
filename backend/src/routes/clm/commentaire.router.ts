import { Router } from 'express';

import { CommentaireController } from '../../controllers/clm/Commentaire.controller';
import { Commentaire } from '../../models/clm/commentaire';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get('/', CommentaireController.coreGetAll(Commentaire))
	.get('/:id', CommentaireController.coreGetOneByPk(Commentaire))
	.get('/publications/:publicationId', CommentaireController.getByPublicationId)
	.post('/publications/:publicationId', isAuthenticated, CommentaireController.coreCreateWithTimestamps(Commentaire))
	.put('/:id', isAuthenticated, CommentaireController.coreUpdateByIdWithTimestamps(Commentaire))
	.delete('/:id', isAuthenticated, CommentaireController.coreDeleteById(Commentaire));

export default router;
