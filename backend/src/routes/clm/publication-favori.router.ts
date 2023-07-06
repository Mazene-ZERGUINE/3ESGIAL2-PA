import { Router } from 'express';

import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';
import { PublicationFavoriController } from '../../controllers/clm/PublicationFavori.controller';
import { PublicationFavori } from '../../models/clm/publication_favori';

const router = Router();
router
	.get('/', [isAuthenticated, isAdministrator], PublicationFavoriController.coreGetAll(PublicationFavori))
	.get('/:publicationId', PublicationFavoriController.getByPublicationId)
	.post('/:publicationId', isAuthenticated, PublicationFavoriController.addStar)
	.delete('/:publicationId', isAuthenticated, PublicationFavoriController.deleteStar);

export default router;
