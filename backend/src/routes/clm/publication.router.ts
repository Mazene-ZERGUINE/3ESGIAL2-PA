import { Router } from 'express';

import { PublicationController } from '../../controllers/clm/Publication.controller';
import { Publication } from '../../models/clm/publication';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';
import { multerConfig } from '../../middlewares/clm/multer.middleware';

const router = Router();
router
	.get('/', PublicationController.coreGetAllAndOrderedBy(Publication, 'DESC', 'publication_id'))
	.get('/active', PublicationController.getAllActive)
	.get('/count/all', PublicationController.coreCount(Publication))
	.get('/:id', PublicationController.coreGetOneByPk(Publication))
	.post('/', [isAuthenticated, multerConfig.array('images', 3)], PublicationController.create)
	.post('/search', PublicationController.search)
	.put('/:id', [isAuthenticated, multerConfig.array('images', 3)], PublicationController.updateById)
	.delete('/:id', isAuthenticated, PublicationController.coreDeleteById(Publication));

export default router;
