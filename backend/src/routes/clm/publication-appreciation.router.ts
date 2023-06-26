import { Router } from 'express';

import { PublicationAppreciationController } from '../../controllers/clm/PublicationAppreciation.controller';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get('/:publicationId/count', PublicationAppreciationController.getByPublicationId)
	.post('/:publicationId/count', isAuthenticated, PublicationAppreciationController.addLike)
	.delete('/:publicationId/count', isAuthenticated, PublicationAppreciationController.deleteLike);

export default router;
