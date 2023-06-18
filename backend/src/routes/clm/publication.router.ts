import { Router } from 'express';

import { PublicationController } from '../../controllers/clm/Publication.controller';
import { Publication } from '../../models/clm/publication';

const router = Router();
router
	.get('/', PublicationController.coreGetAll(Publication))
	.get('/:id', PublicationController.coreGetOneByPk(Publication))
	.post('/', PublicationController.coreCreateWithTimestamps(Publication))
	.put('/:id', PublicationController.updateById)
	.delete('/:id', PublicationController.coreDeleteById(Publication));

export default router;
