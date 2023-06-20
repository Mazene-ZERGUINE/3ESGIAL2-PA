import { Router } from 'express';

import { ImageController } from '../../controllers/clm/Image.controller';
import { Image } from '../../models/clm/image';

// TODO middlewares
const router = Router();
router
	.get('/', ImageController.coreGetAll(Image))
	.get('/:id', ImageController.coreGetOneByPk(Image))
	.delete('/:id', ImageController.coreDeleteById(Image));

export default router;
