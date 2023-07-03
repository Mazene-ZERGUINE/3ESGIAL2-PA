import { Router } from 'express';

import { PublicationAppreciationController } from '../../controllers/clm/PublicationAppreciation.controller';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';
import { PublicationAppreciation } from '../../models/clm/publication-appreciation';

const router = Router();
router
	.get('/', [isAuthenticated, isAdministrator], PublicationAppreciationController.coreGetAll(PublicationAppreciation))
	.get('/:publicationId/count', PublicationAppreciationController.getByPublicationId)
	.post('/:publicationId/count', isAuthenticated, PublicationAppreciationController.addLike)
	.delete('/:publicationId/count', isAuthenticated, PublicationAppreciationController.deleteLike);

export default router;
