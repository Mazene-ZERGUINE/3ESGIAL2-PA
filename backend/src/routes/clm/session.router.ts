import { Router } from 'express';

import { SessionController } from '../../controllers/clm/Session.controller';
import { Session } from '../../models/clm/session';

const router = Router();
router
	.get('/', SessionController.coreGetAll(Session))
	.get('/:id', SessionController.coreGetOneByPk(Session))
	.delete('/:id', SessionController.coreDeleteById(Session));

export default router;
