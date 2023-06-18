import { Router } from 'express';
import { CategorieController } from '../../controllers/clm/Categorie.controller';
import { Categorie } from '../../models/clm/categorie';

const router = Router();
router
	.get('/', CategorieController.coreGetAll(Categorie))
	.get('/:id', CategorieController.coreGetOneByPk(Categorie))
	.post('/', CategorieController.coreCreateWithoutTimestamps(Categorie))
	.put('/:id', CategorieController.coreUpdateByIdWithoutTimestamps(Categorie))
	.delete('/:id', CategorieController.coreDeleteById(Categorie));

export default router;
