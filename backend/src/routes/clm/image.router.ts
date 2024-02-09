import { Router } from 'express';

import { ImageController } from '../../controllers/clm/Image.controller';
import { Image } from '../../models/clm/image';
import { isAuthenticated } from '../../middlewares/clm/auth.middleware';

// TODO middlewares
const router = Router();
router
	.get('/', ImageController.coreGetAllWithoutInclude(Image, 'image'))
	.get('/:id', ImageController.getImageByPublication(Image))
	.delete('/:id', isAuthenticated, ImageController.coreDeleteById(Image)); // todo: might replace the method

export default router;
